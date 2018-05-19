var myFigureColor;
var figureColors = ["white", "black"];
var whiteInterval = undefined;
var blackInterval = undefined;
var whiteTime = 0;
var blackTime = 0;
var minutes;
var seconds;
var websocket;

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function Move(from, to, typeName) {
    this.typeName = typeName;
    this.from = from;
    this.to = to;
}

function MoveNotification(div, figureColor, typeName) {
    this.typeName = typeName;
    this.div = div;
    this.figureColor = figureColor;
}

function Message(issuer, msg, typeName) {
    this.typeName = typeName;
    this.issuer = issuer;
    this.msg = msg;
}

function Time(color, time, typeName) {
    this.typeName = typeName;
    this.color = color;
    this.time = time;
}

function Typing(typing, typeName) {
    this.typeName = typeName;
    this.typing = typing
}

var gameTable = '<div class="cemetery"><div class="cemetery-white" id="cw1"></div><div class="cemetery-black" id="cb1"></div></div><div class="divTable">\n' +
    '<div class="divTableBody">\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-rock1" class="draggable black">♜</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-knight1" class="draggable black">♞</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-bishop1" class="draggable black">♝</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-queen" class="draggable black">♛</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-king" class="draggable black">♚</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-bishop2" class="draggable black">♝</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-knight2" class="draggable black">♞</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-rack2" class="draggable black">♜</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn1" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn2" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn3" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn4" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn5" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn6" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn7" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn8" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn1" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn2" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn3" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn4" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn5" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn6" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn7" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn8" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-rock1" class="draggable white">♖</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-knight1" class="draggable white">♘</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-bishop1" class="draggable white">♗</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-queen" class="draggable white">♕</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-king" class="draggable white">♔</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-bishop2" class="draggable white">♗</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-knight2" class="draggable white">♘</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-rack2" class="draggable white">♖</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div><div class="cemetery"><div class="cemetery-white" id="cw2"></div><div class="cemetery-black" id="cb2"></div></div>';

var gameTableVerse = '<div class="cemetery"><div class="cemetery-black" id="cb1"></div><div class="cemetery-white" id="cw1"></div></div><div class="divTable">\n' +
    '<div class="divTableBody">\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-rack2" class="draggable white">♖</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-knight2" class="draggable white">♘</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-bishop2" class="draggable white">♗</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-king" class="draggable white">♔</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-queen" class="draggable white">♕</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-bishop1" class="draggable white">♗</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-knight1" class="draggable white">♘</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-rock1" class="draggable white">♖</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn8" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn7" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn6" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn5" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn4" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn3" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn2" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="white-pawn1" class="draggable white">♙</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '<div class="divTableCell">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn8" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn7" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn6" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn5" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn4" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn3" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn2" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-pawn1" class="draggable black">♟</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-rack2" class="draggable black">♜</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-knight2" class="draggable black">♞</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-bishop2" class="draggable black">♝</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-king" class="draggable black">♚</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-queen" class="draggable black">♛</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-bishop1" class="draggable black">♝</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-knight1" class="draggable black">♞</div>\n' +
    '</div>\n' +
    '<div class="divTableCell">\n' +
    '<div id="black-rock1" class="draggable black">♜</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div><div class="cemetery"><div class="cemetery-black" id="cb2"></div><div class="cemetery-white" id="cw2"></div></div>';

function pauseTimer() {
    if (myFigureColor === "white") {
        clearInterval(whiteInterval);
        whiteInterval = undefined;
    } else {
        clearInterval(blackInterval);
        blackInterval = undefined;
    }
}

function resumeTimer() {
    if (myFigureColor === "black") {

        blackInterval = setInterval(function () {
            blackTime += 1;
            minutes = Math.floor(blackTime / 60);
            seconds = blackTime - minutes * 60;
            websocket.send(JSON.stringify(new Time("black", str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2), "Time")));
            $("#blackTime").html("<span class='time'>" + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2) + "</span>");
        }, 1000);
    } else {

        whiteInterval = setInterval(function () {
            whiteTime += 1;
            minutes = Math.floor(whiteTime / 60);
            seconds = whiteTime - minutes * 60;
            websocket.send(JSON.stringify(new Time("white", str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2), "Time")));
            $("#whiteTime").html("<span class='time'>" + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2) + "</span>");
        }, 1000);
    }
}

function connect() {
    var webSocketUrl = 'ws://' + window.location.host + '/websocket';
    if (window.location.hash.length !== 0) {
        webSocketUrl = webSocketUrl + "?opp=" + window.location.hash.substring(1, window.location.hash.length)
    }
    websocket = new WebSocket(webSocketUrl);
    var move; // chess move log (e2-e4)

    function addDnD() {
        $(".draggable." + myFigureColor).draggable({
            start: function (event, ui) {
                move = $(this).parents(".divTableCell").attr("id");
            }
        });

        $("div[class^='cemetery-']").droppable({
            drop: function (event, ui) {
                var to;
                $(event.toElement).css({top: 0, left: 0, position: '', float: 'left'});

                function toCemetery(color, e) {
                    if ($(event.toElement).attr("id").indexOf(color) !== -1 && $(e).attr("class").indexOf(color) === -1) {
                        if ($($(".cemetery-" + color)[0]).find(".draggable").size() / 2 * $(".draggable").height() > $($(".cemetery-" + color)[0]).height()) {
                            $($(".cemetery-" + color)[1]).append($(event.toElement));
                            to = $($(".cemetery-" + color)[1]).attr("id");
                        } else {
                            $($(".cemetery-" + color)[0]).append($(event.toElement));
                            to = $($(".cemetery-" + color)[0]).attr("id");
                        }
                    } else if ($(event.toElement).attr("id").indexOf(color) !== -1 && $(e).attr("class").indexOf(color) !== -1) {
                        if ($($(".cemetery-" + color)[0]).find(".draggable").size() / 2 * $(".draggable").height() > $($(".cemetery-" + color)[0]).height()) {
                            $($(".cemetery-" + color)[1]).append($(event.toElement));
                            to = $($(".cemetery-" + color)[1]).attr("id");
                        } else {
                            $(e).append($(event.toElement));
                            to = $(e).attr("id");
                        }
                    }
                }

                toCemetery("black", this);

                toCemetery("white", this);

                var from = move;
                move = move + " - X";
                var moveDiv = "<div class='mv-" + myFigureColor + "'>" + move + "</div>";
                $("#" + myFigureColor + "-moves").append(moveDiv);

                websocket.send(JSON.stringify(new Move(from, to, "Move")));
                websocket.send(JSON.stringify(new MoveNotification(moveDiv, myFigureColor, "MoveNotification")));
            }
        });

        $(".divTableCell").droppable({
            drop: function (event, ui) {
                pauseTimer();
                $(event.toElement).css({top: 0, left: 0});
                $(this).append($(event.toElement));
                var from = move;
                move = move + " - " + $(this).attr("id");
                var moveDiv = "<div class='mv-" + myFigureColor + "'>" + move + "</div>";
                $("#" + myFigureColor + "-moves").append(moveDiv);
                websocket.send(JSON.stringify(new Move(from, $(this).attr("id"), "Move")));
                websocket.send(JSON.stringify(new MoveNotification(moveDiv, myFigureColor, "MoveNotification")));
            }
        });
    }

    function onMessage(evt) {
        var message = evt.data;
        if (message.indexOf("{") !== -1 && message.indexOf("MoveNotification") !== -1) {
            resumeTimer();
            var json = JSON.parse(message);
            $("#" + json.figureColor + "-moves").append(json.div);
        } else if (message.indexOf("{") !== -1 && message.indexOf("Move") !== -1) { // message to move figure
            var json = JSON.parse(message);
            $("#" + json.to).append($("#" + json.from).find("div"));
        } else if (message.indexOf("{") !== -1 && message.indexOf("Message") !== -1) {
            var json = JSON.parse(message);
            $("#chatMessages").val($("#chatMessages").val() + "\n" + (json.issuer + ": " + json.msg));
            document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight
        } else if (message.indexOf("{") !== -1 && message.indexOf("Typing") !== -1) {
            var json = JSON.parse(message);
            if (json.typing) {
                $("#typing").fadeIn();
            } else {
                $("#typing").fadeOut();
            }
        } else if (message.indexOf("{") !== -1 && message.indexOf("Time") !== -1) {
            var json = JSON.parse(message);
            if (json.color === "white") {
                $("#whiteTime").html("<span class='time'>" + json.time + "</span>");
            } else if (json.color === "black") {
                $("#blackTime").html("<span class='time'>" + json.time + "</span>");
            }
        } else if (message.indexOf("Ok!") === -1 && message.indexOf("session:") !== -1) {
            console.log(window.location.host + "/#" + message.substring('session:'.length, message.length));
            if (window.location.href.indexOf("#") === -1) {
                $("#waiting span").html("<h1>Waiting for opponent <br>Chess board number: "
                    + message.substring('session:'.length, message.length)
                    + "</h1><br><br><h2>"
                    + window.location.host + "/#" + message.substring('session:'.length, message.length)
                    + "</h2>");
            }
            $("#gameTable").append(gameTable);
            myFigureColor = "white";
        } else if (message.indexOf("Connected to opponent") !== -1) {
            $("#gameTable").append(gameTableVerse);
            myFigureColor = "black";
            addDnD();
        } else if (message.indexOf("Opponent with id") !== -1) {
            addDnD();
            var filterVal = 'blur(0px)';
            $("#waiting").fadeOut();
            $("#content").css({filter: filterVal});
            whiteInterval = setInterval(function () {
                whiteTime += 1;
                minutes = Math.floor(whiteTime / 60);
                seconds = whiteTime - minutes * 60;
                websocket.send(JSON.stringify(new Time("white", str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2), "Time")));
                $("#whiteTime").html("<span class='time'>" + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2) + "</span>");
            }, 1000);
        }
    }

    websocket.onmessage = function (evt) {
        onMessage(evt)
    };

    return websocket;
}

$(window).load(function () {
    $(".divTable").css({"height": $(".divTable").width()});
    $("#gameTable").css({"height": $(".divTable").width()});
    $("#main-chess").css({"height": $(".divTable").width()});
    $("#chat").css({"height": $(".divTable").width()});
});

$(function () {
    if (window.location.href.indexOf("#") === -1) {
        var filterVal = 'blur(7px)';
        $("#content").css({filter: filterVal});
        $("#waiting span").html("<h2>Connection...</h2>");
        $("#waiting").fadeIn();
    }

    var websocket = connect();
    var isTyping = false;
    var isSent = false;

    $("#whiteTime").html("<span class='time'> 00.00 </span>");
    $("#blackTime").html("<span class='time'> 00.00 </span>");

    setInterval(function () {
        if (!isTyping && isSent) {
            websocket.send(JSON.stringify(new Typing(false, "Typing")));
            isSent = false;
        }
    }, 2000);

    $("#inp input").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            websocket.send(JSON.stringify(new Message(myFigureColor, $("#inp input").val(), "Message")));
            $("#chatMessages").val($("#chatMessages").val() + "\n" + (myFigureColor + ": " + $("#inp input").val()));
            $("#inp input").val("");
            document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
            return;
        }

        isTyping = true;
        if (isTyping && !isSent) {
            websocket.send(JSON.stringify(new Typing(true, "Typing")));
            isSent = true;
        }

        setInterval(function () {
            isTyping = false;
        }, 1500);
    })
});