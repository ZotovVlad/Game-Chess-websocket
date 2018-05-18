package org.game.chess.service;

import org.game.chess.controller.SessionController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

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

    public WebSocketSession getOpponentForSessionBySessionId(String sessionId) {
        return sessionController.getOpponentBySessionId(sessionId);
    }

    public void removeSessionRecordBySessionId(String sessionId) {
        sessionController.removeSessionRecordBysessionId(sessionId);
    }

    public int getSessionsOnline() {
        return sessionController.getSessionsOnline();
    }
}
