package org.game.chess.service;

import org.game.chess.controller.SessionController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * Created by keks on 004 04.04.18.
 */

@Service
public class SessionService {

    @Autowired
    private SessionController sessionController;

    public String saveSession(WebSocketSession session) throws UnsupportedEncodingException {
        return sessionController.saveSession(session);
    }

    public WebSocketSession getOpponentForSession(WebSocketSession session) {
        return sessionController.getOpponentSession(session);
    }

    public void removeSession(WebSocketSession session) {
        sessionController.removeSession(session);
    }

    public int getSessionsOnline() {
        return sessionController.getSessionsOnline();
    }
}
