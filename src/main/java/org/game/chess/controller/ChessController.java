package org.game.chess.controller;

import org.game.chess.model.FigureCoordinate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChessController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public FigureCoordinate greeting(FigureCoordinate message) {
        return message;
    }
}
