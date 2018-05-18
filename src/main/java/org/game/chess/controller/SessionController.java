package org.game.chess.controller;

import lombok.extern.log4j.Log4j;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketSession;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * Created by keks on 004 04.04.18.
 */

@Controller
@Log4j
public class SessionController {

    private Map<WebSocketSession, WebSocketSession> sessions = new HashMap<>();

    public String saveSession(WebSocketSession session) throws UnsupportedEncodingException {
        String query = session.getUri().getQuery();

        if (StringUtils.isNotBlank(query)) {
            String opponentId = URLDecoder.decode(query.substring(query.indexOf("=") + 1), "UTF-8");
            WebSocketSession opponentSession = getSessionById(opponentId);
            if (opponentSession != null) {
                sessions.put(session, opponentSession);
                sessions.put(opponentSession, session);
                return null;
            }
        }
        sessions.put(session, null);
        return session.getId();
    }

    public WebSocketSession getOpponentBySessionId(String sessionId) {
        WebSocketSession opponentSession = getSessionById(sessionId);
        return sessions.get(opponentSession);
    }

    public WebSocketSession getSessionById(String sessionId) {
        return sessions.keySet().stream().filter(webSocketSession -> webSocketSession.getId().equals(sessionId)).findFirst().orElse(null);
    }

    public void removeSession(WebSocketSession session) {
        log.info("Sessions online before cleanup: " + getSessionsOnline());
        sessions.values().removeAll(Collections.singleton(session));
        sessions.remove(session);
        log.info("Sessions online after: " + getSessionsOnline());
    }

    public int getSessionsOnline() {
        return sessions.size();
    }
}
