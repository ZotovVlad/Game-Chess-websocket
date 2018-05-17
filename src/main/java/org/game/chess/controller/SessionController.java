package org.game.chess.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketSession;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by keks on 004 04.04.18.
 */

@Controller
public class SessionController {

    private Map<String, String> sessions = new HashMap<>();

    public void saveSession(WebSocketSession session) throws UnsupportedEncodingException {
        String query = session.getUri().getQuery();
        String clientId = URLDecoder.decode(query.substring(query.indexOf("=") + 1), "UTF-8");
        sessions.put(session.getId(), clientId);
    }

    public String getSessionIdByClientId(String clientId) {
        Collection<String> values = sessions.values();
        return values.stream().filter(val -> val.equals(clientId)).findFirst().orElse("");
    }

    public String getClientIdBySessionId(String sessionId) {
        return sessions.get(sessionId);
    }

    public void removeSessionRecordBysessionId(String sessionId) {
        sessions.remove(sessionId);
    }

    public int getSessionsOnline() {
        return sessions.size();
    }
}
