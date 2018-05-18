package org.game.chess;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;


/**
 * Created by Business_Book on 08.04.2016.
 */

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    @Bean
    public WebSocketHandler myMessageHandler() {
        return new ChessMessageHandler();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(myMessageHandler(), "/websocket")
                .setAllowedOrigins("*");
    }
}