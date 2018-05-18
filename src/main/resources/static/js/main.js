var myFigureColor;
var figureColors = ["white", "black"];

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

function Typing(typing, typeName) {
    this.typeName = typeName;
    this.typing = typing
}

var gameTable = '<div class="cemetery"><div class="cemetery-white" id="cw1"></div><div class="cemetery-black" id="cb1"></div></div><table>\n' +
    '        <tr>\n' +
    '            <td id="a8">\n' +
    '                <div id="black-rock1" class="draggable black">&#9820;</div>\n' +
    '            </td>\n' +
    '            <td id="b8">\n' +
    '                <div id="black-knight1" class="draggable black">&#9822;</div>\n' +
    '            </td>\n' +
    '            <td id="c8">\n' +
    '                <div id="black-bishop1" class="draggable black">&#9821;</div>\n' +
    '            </td>\n' +
    '            <td id="d8">\n' +
    '                <div id="black-queen" class="draggable black">&#9819;</div>\n' +
    '            </td>\n' +
    '            <td id="e8">\n' +
    '                <div id="black-king" class="draggable black">&#9818;</div>\n' +
    '            </td>\n' +
    '            <td id="f8">\n' +
    '                <div id="black-bishop2" class="draggable black">&#9821;</div>\n' +
    '            </td>\n' +
    '            <td id="g8">\n' +
    '                <div id="black-knight2" class="draggable black">&#9822;</div>\n' +
    '            </td>\n' +
    '            <td id="h8">\n' +
    '                <div id="black-rack2" class="draggable black">&#9820;</div>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a7">\n' +
    '                <div id="black-pawn1" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="b7">\n' +
    '                <div id="black-pawn2" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="c7">\n' +
    '                <div id="black-pawn3" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="d7">\n' +
    '                <div id="black-pawn4" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="e7">\n' +
    '                <div id="black-pawn5" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="f7">\n' +
    '                <div id="black-pawn6" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="g7">\n' +
    '                <div id="black-pawn7" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '            <td id="h7">\n' +
    '                <div id="black-pawn8" class="draggable black">&#9823;</div>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a6"></td>\n' +
    '            <td id="b6"></td>\n' +
    '            <td id="c6"></td>\n' +
    '            <td id="d6"></td>\n' +
    '            <td id="e6"></td>\n' +
    '            <td id="f6"></td>\n' +
    '            <td id="g6"></td>\n' +
    '            <td id="h6"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a5"></td>\n' +
    '            <td id="b5"></td>\n' +
    '            <td id="c5"></td>\n' +
    '            <td id="d5"></td>\n' +
    '            <td id="e5"></td>\n' +
    '            <td id="f5"></td>\n' +
    '            <td id="g5"></td>\n' +
    '            <td id="h5"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a4"></td>\n' +
    '            <td id="b4"></td>\n' +
    '            <td id="c4"></td>\n' +
    '            <td id="d4"></td>\n' +
    '            <td id="e4"></td>\n' +
    '            <td id="f4"></td>\n' +
    '            <td id="g4"></td>\n' +
    '            <td id="h4"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a3"></td>\n' +
    '            <td id="b3"></td>\n' +
    '            <td id="c3"></td>\n' +
    '            <td id="d3"></td>\n' +
    '            <td id="e3"></td>\n' +
    '            <td id="f3"></td>\n' +
    '            <td id="g3"></td>\n' +
    '            <td id="h3"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a2">\n' +
    '                <div id="white-pawn1" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="b2">\n' +
    '                <div id="white-pawn2" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="c2">\n' +
    '                <div id="white-pawn3" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="d2">\n' +
    '                <div id="white-pawn4" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="e2">\n' +
    '                <div id="white-pawn5" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="f2">\n' +
    '                <div id="white-pawn6" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="g2">\n' +
    '                <div id="white-pawn7" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '            <td id="h2">\n' +
    '                <div id="white-pawn8" class="draggable white">&#9817;</div>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="a1">\n' +
    '                <div id="white-rock1" class="draggable white">&#9814;</div>\n' +
    '            </td>\n' +
    '            <td id="b1">\n' +
    '                <div id="white-knight1" class="draggable white">&#9816;</div>\n' +
    '            </td>\n' +
    '            <td id="c1">\n' +
    '                <div id="white-bishop1" class="draggable white">&#9815;</div>\n' +
    '            </td>\n' +
    '            <td id="d1">\n' +
    '                <div id="white-queen" class="draggable white">&#9813;</div>\n' +
    '            </td>\n' +
    '            <td id="e1">\n' +
    '                <div id="white-king" class="draggable white">&#9812;</div>\n' +
    '            </td>\n' +
    '            <td id="f1">\n' +
    '                <div id="white-bishop2" class="draggable white">&#9815;</div>\n' +
    '            </td>\n' +
    '            <td id="g1">\n' +
    '                <div id="white-knight2" class="draggable white">&#9816;</div>\n' +
    '            </td>\n' +
    '            <td id="h1">\n' +
    '                <div id="white-rack2" class="draggable white">&#9814;</div>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '    </table><div class="cemetery"><div class="cemetery-white" id="cw2"></div><div class="cemetery-black" id="cb2"></div></div>';

var gameTableVerse = '<div class="cemetery"><div class="cemetery-black" id="cb1"></div><div class="cemetery-white" id="cw1"></div></div><table>\n' +
    '        <tr>\n' +
    '            <td id="h1"><div id="white-rack2" class="draggable white">&#9814;</div></td>\n' +
    '            <td id="g1"><div id="white-knight2" class="draggable white">&#9816;</div></td>\n' +
    '            <td id="f1"><div id="white-bishop2" class="draggable white">&#9815;</div></td>\n' +
    '            <td id="e1"><div id="white-king" class="draggable white">&#9812;</div></td>\n' +
    '            <td id="d1"><div id="white-queen" class="draggable white">&#9813;</div></td>\n' +
    '            <td id="c1"><div id="white-bishop1" class="draggable white">&#9815;</div></td>\n' +
    '            <td id="b1"><div id="white-knight1" class="draggable white">&#9816;</div></td>\n' +
    '            <td id="a1"><div id="white-rock1" class="draggable white">&#9814;</div></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h2"><div id="white-pawn8" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="g2"><div id="white-pawn7" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="f2"><div id="white-pawn6" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="e2"><div id="white-pawn5" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="d2"><div id="white-pawn4" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="c2"><div id="white-pawn3" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="b2"><div id="white-pawn2" class="draggable white">&#9817;</div></td>\n' +
    '            <td id="a2"><div id="white-pawn1" class="draggable white">&#9817;</div></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h3"></td>\n' +
    '            <td id="g3"></td>\n' +
    '            <td id="f3"></td>\n' +
    '            <td id="e3"></td>\n' +
    '            <td id="d3"></td>\n' +
    '            <td id="c3"></td>\n' +
    '            <td id="b3"></td>\n' +
    '            <td id="a3"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h4"></td>\n' +
    '            <td id="g4"></td>\n' +
    '            <td id="f4"></td>\n' +
    '            <td id="e4"></td>\n' +
    '            <td id="d4"></td>\n' +
    '            <td id="c4"></td>\n' +
    '            <td id="b4"></td>\n' +
    '            <td id="a4"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h5"></td>\n' +
    '            <td id="g5"></td>\n' +
    '            <td id="f5"></td>\n' +
    '            <td id="e5"></td>\n' +
    '            <td id="d5"></td>\n' +
    '            <td id="c5"></td>\n' +
    '            <td id="b5"></td>\n' +
    '            <td id="a5"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h6"></td>\n' +
    '            <td id="g6"></td>\n' +
    '            <td id="f6"></td>\n' +
    '            <td id="e6"></td>\n' +
    '            <td id="d6"></td>\n' +
    '            <td id="c6"></td>\n' +
    '            <td id="b6"></td>\n' +
    '            <td id="a6"></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h7"><div id="black-pawn8" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="g7"><div id="black-pawn7" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="f7"><div id="black-pawn6" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="e7"><div id="black-pawn5" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="d7"><div id="black-pawn4" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="c7"><div id="black-pawn3" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="b7"><div id="black-pawn2" class="draggable black">&#9823;</div></td>\n' +
    '            <td id="a7"><div id="black-pawn1" class="draggable black">&#9823;</div></td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td id="h8"><div id="black-rack2" class="draggable black">&#9820;</div></td>\n' +
    '            <td id="g8"><div id="black-knight2" class="draggable black">&#9822;</div></td>\n' +
    '            <td id="f8"><div id="black-bishop2" class="draggable black">&#9821;</div></td>\n' +
    '            <td id="e8"><div id="black-king" class="draggable black">&#9818;</div></td>\n' +
    '            <td id="d8"><div id="black-queen" class="draggable black">&#9819;</div></td>\n' +
    '            <td id="c8"><div id="black-bishop1" class="draggable black">&#9821;</div></td>\n' +
    '            <td id="b8"><div id="black-knight1" class="draggable black">&#9822;</div></td>\n' +
    '            <td id="a8"><div id="black-rock1" class="draggable black">&#9820;</div></td>\n' +
    '        </tr>\n' +
    '    </table><div class="cemetery"><div class="cemetery-black" id="cb2"></div><div class="cemetery-white" id="cw2"></div></div>';

function connect() {
    var webSocketUrl = 'ws://' + window.location.host + '/websocket';
    if (window.location.hash.length !== 0) {
        webSocketUrl = webSocketUrl + "?opp=" + window.location.hash.substring(1, window.location.hash.length)
    }
    var websocket = new WebSocket(webSocketUrl);
    var move; // chess move log (e2-e4)

    function addDnD() {
        $(".draggable." + myFigureColor).draggable({
            start: function (event, ui) {
                move = $(this).parents("td").attr("id");
            },
            drag: function (event, ui) {
                // var offset = $("#gameTable").offset();
                // websocket.send(JSON.stringify({
                //     'name': $(event.target).attr("id"),
                //     'coordX': $(event.target).position().left - offset.left,
                //     'coordY': $(event.target).position().top - offset.top
                // }));
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
                console.log(myFigureColor + ": " + move);
            }
        });

        $("td").droppable({
            // classes: {
            //     "ui-droppable-hover": "ui-state-hover"
            // },
            drop: function (event, ui) {
                $(event.toElement).css({top: 0, left: 0});
                $(this).append($(event.toElement));
                var from = move;
                move = move + " - " + $(this).attr("id");
                var moveDiv = "<div class='mv-" + myFigureColor + "'>" + move + "</div>";
                $("#" + myFigureColor + "-moves").append(moveDiv);
                websocket.send(JSON.stringify(new Move(from, $(this).attr("id"), "Move")));
                websocket.send(JSON.stringify(new MoveNotification(moveDiv, myFigureColor, "MoveNotification")));
                console.log(myFigureColor + ": " + move);
            }
        });
    }

    var toCalss = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };

    function onMessage(evt) {
        var message = evt.data;
        // var res = toClass(JSON.parse(message), Messa)
        if (message.indexOf("{") !== -1 && message.indexOf("Move") !== -1) { // message to move figure
            // var offset = $("#gameTable").offset();
            var json = JSON.parse(message);
            $("#" + json.to).append($("#" + json.from).find("div"));
            // $("#" + json.name).css({left: json.coordX + offset.left, top: json.coordY + offset.top});
        } else if (message.indexOf("{") !== -1 && message.indexOf("MoveNotification") !== -1) {
            var json = JSON.parse(message);
            $("#" + json.figureColor + "-moves").append(json.div);
        } else if (message.indexOf("{") !== -1 && message.indexOf("Message") !== -1) {
            var json = JSON.parse(message);
            $("#msgs textarea").val($("#msgs textarea").val() + "\n" + (json.issuer + ": " + json.msg));
        } else if (message.indexOf("{") !== -1 && message.indexOf("Typing") !== -1) {
            var json = JSON.parse(message);
            if (json.typing) {
                $("#typing").fadeIn();
            } else {
                $("#typing").fadeOut();
            }
        } else if (message.indexOf("Ok!") === -1 && message.indexOf("session:") !== -1) {
            console.log(window.location.host + "/#" + message.substring('session:'.length, message.length));
            // window.location.host = window.location.protocol + "//" + window.location.host + "/#" + message.substring('session:'.length, message.length);
            $("#gameTable").append(gameTable);
            myFigureColor = "white";
        } else if (message.indexOf("Connected to opponent") !== -1) {
            $("#gameTable").append(gameTableVerse);
            myFigureColor = "black";
            console.log(message);
            addDnD();
        } else if (message.indexOf("Opponent with id") !== -1) {
            console.log(message);
            addDnD();
        }
    }

    websocket.onmessage = function (evt) {
        onMessage(evt)
    };

    return websocket;
}

$(function () {
    var websocket = connect();
    var typingCheck;
    var isTyping = false;
    var isSent = false;

    typingCheck = setInterval(function () {
        if (typingCheck != undefined) {
            if (!isTyping && isSent) {
                websocket.send(JSON.stringify(new Typing(false, "Typing")));
                isSent = false;
            }
        }
    }, 2000);

    $("#inp input").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            websocket.send(JSON.stringify(new Message(myFigureColor, $("#inp input").val(), "Message")));
            $("#inp input").val("");
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