package org.game.chess;

import lombok.extern.log4j.Log4j;
import org.game.chess.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

/**
 * Created by keks on 031 31.03.18.
 */

@Log4j
public class ChessMessageHandler extends TextWebSocketHandler {

    @Autowired
    private SessionService sessionService;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // The WebSocket has been closed
        log.info("Connection closed. Session id " + session.getId() + " reason " + status.getReason());
        sessionService.removeSession(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        log.info("Transport error. Session id " + session.getId() + " reason " + exception.getLocalizedMessage());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // The WebSocket has been opened
        log.info("Connection established. For session " + session.getId());
        String singleSession = sessionService.saveSession(session);
        if (singleSession != null) {
            session.sendMessage(new TextMessage("session:" + session.getId()));
        } else {
            WebSocketSession opponent = sessionService.getOpponentForSessionBySessionId(session.getId());
            if (opponent != null) {
                opponent.sendMessage(new TextMessage("Ok! Opponent with id " + session.getId() + " connected"));
                session.sendMessage(new TextMessage("Ok! Connected to opponent with id " + opponent.getId()));
            } else {
                throw new Exception("No opponent error!");
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException {
        // A message has been received
//        log.info("Message received: " + textMessage.getPayload());
        WebSocketSession opponentSession = sessionService.getOpponentForSessionBySessionId(session.getId());
        if (opponentSession != null) {
            opponentSession.sendMessage(textMessage);
        }
    }
}
