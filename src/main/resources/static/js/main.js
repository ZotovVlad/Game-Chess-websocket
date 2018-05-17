var stompClient = null;

function connect() {
    var socket = new SockJS('/chess');

    $(".draggable").draggable({
        start: function (event, ui) {
            console.log($(this).parents("td").attr("id"));
        },
        drag: function (event, ui) {
            var offset = $("#gameTable").offset();
            // debugger;
            stompClient.send("/app/hello", {}, JSON.stringify({
                'name': $(event.target).attr("id"),
                'coordX': $(event.target).position().left - offset.left,
                'coordY': $(event.target).position().top - offset.top
            }));
        }
    });
    $("td").droppable({
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            $(event.toElement).css({top: 0, left: 0});
            $(this).append($(event.toElement));
        }
    });

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (message) {
            var json = JSON.parse(message.body);
            var offset = $("#gameTable").offset();
            // if (json.name.indexOf('black') !== -1) {
            //     $("#" + json.name).css({left: json.coordX + offset.left, top: json.coordY + offset.top});
            // }
        });
    });
}

$(function () {
    console.log("loaded");
    connect();
});