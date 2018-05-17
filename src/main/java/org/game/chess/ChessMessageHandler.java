package org.game.chess;

import lombok.extern.log4j.Log4j;
import org.game.chess.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

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
        sessionService.removeSessionRecordBySessionId(session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        log.info("Transport error. Session id " + session.getId() + " reason " + exception.getLocalizedMessage());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // The WebSocket has been opened
        session.sendMessage(new TextMessage("You are now connected to the server. " + session.getId()));
        log.info("Connection established. For session " + session.getId());
        String clientId = sessionService.saveSessionIdAndGetClientId(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) {
        // A message has been received
        log.info("Message received: " + textMessage.getPayload());
    }
}
