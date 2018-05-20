var myFigureColor;
var figureColors = ["white", "black"];
var whiteInterval = undefined;
var blackInterval = undefined;
var whiteTime = 0;
var blackTime = 0;
var minutes;
var seconds;
var websocket;
var movesArray = [];

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function MoveNotification(div, figureColor, from, to, typeName) {
    this.typeName = typeName;
    this.div = div;
    this.figureColor = figureColor;
    this.from = from;
    this.to = to;
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
    '<div class="divTableCell" id="a8"><div id="black-rock1" class="draggable" color="black">&#9820;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b8"><div id="black-knight1" class="draggable" color="black">&#9822;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c8"><div id="black-bishop1" class="draggable" color="black">&#9821;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d8"><div id="black-queen" class="draggable" color="black">&#9819;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e8"><div id="black-king" class="draggable" color="black">&#9818;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f8"><div id="black-bishop2" class="draggable" color="black">&#9821;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g8"><div id="black-knight2" class="draggable" color="black">&#9822;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="h8"><div id="black-rack2" class="draggable" color="black">&#9820;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a7"><div id="black-pawn1" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b7"><div id="black-pawn2" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c7"><div id="black-pawn3" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d7"><div id="black-pawn4" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e7"><div id="black-pawn5" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f7"><div id="black-pawn6" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g7"><div id="black-pawn7" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="h7"><div id="black-pawn8" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="h6">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="h5">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="h4">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="h3">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a2"><div id="white-pawn1" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b2"><div id="white-pawn2" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c2"><div id="white-pawn3" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d2"><div id="white-pawn4" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e2"><div id="white-pawn5" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f2"><div id="white-pawn6" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g2"><div id="white-pawn7" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="h2"><div id="white-pawn8" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="a1"><div id="white-rock1" class="draggable" color="white">&#9814;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b1"><div id="white-knight1" class="draggable" color="white">&#9816;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c1"><div id="white-bishop1" class="draggable" color="white">&#9815;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d1"><div id="white-queen" class="draggable" color="white">&#9813;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e1"><div id="white-king" class="draggable" color="white">&#9812;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f1"><div id="white-bishop2" class="draggable" color="white">&#9815;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g1"><div id="white-knight2" class="draggable" color="white">&#9816;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="h1"><div id="white-rack2" class="draggable" color="white">&#9814;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div><div class="cemetery"><div class="cemetery-white" id="cw2"></div><div class="cemetery-black" id="cb2"></div></div>';

var gameTableVerse = '<div class="cemetery"><div class="cemetery-black" id="cb1"></div><div class="cemetery-white" id="cw1"></div></div><div class="divTable">\n' +
    '<div class="divTableBody">\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h1">\n' +
    '<div id="white-rack2" class="draggable" color="white">&#9814;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g1">\n' +
    '<div id="white-knight2" class="draggable" color="white">&#9816;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f1">\n' +
    '<div id="white-bishop2" class="draggable" color="white">&#9815;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e1">\n' +
    '<div id="white-king" class="draggable" color="white">&#9812;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d1">\n' +
    '<div id="white-queen" class="draggable" color="white">&#9813;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c1">\n' +
    '<div id="white-bishop1" class="draggable" color="white">&#9815;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b1">\n' +
    '<div id="white-knight1" class="draggable" color="white">&#9816;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="a1">\n' +
    '<div id="white-rock1" class="draggable" color="white">&#9814;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h2">\n' +
    '<div id="white-pawn8" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g2">\n' +
    '<div id="white-pawn7" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f2">\n' +
    '<div id="white-pawn6" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e2">\n' +
    '<div id="white-pawn5" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d2">\n' +
    '<div id="white-pawn4" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c2">\n' +
    '<div id="white-pawn3" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b2">\n' +
    '<div id="white-pawn2" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="a2">\n' +
    '<div id="white-pawn1" class="draggable" color="white">&#9817;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b3">&nbsp;</div>\n' +
    '<div class="divTableCell" id="a3">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b4">&nbsp;</div>\n' +
    '<div class="divTableCell" id="a4">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b5">&nbsp;</div>\n' +
    '<div class="divTableCell" id="a5">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="g6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="f6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="e6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="d6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="c6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="b6">&nbsp;</div>\n' +
    '<div class="divTableCell" id="a6">&nbsp;</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h7">\n' +
    '<div id="black-pawn8" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g7">\n' +
    '<div id="black-pawn7" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f7">\n' +
    '<div id="black-pawn6" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e7">\n' +
    '<div id="black-pawn5" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d7">\n' +
    '<div id="black-pawn4" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c7">\n' +
    '<div id="black-pawn3" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b7">\n' +
    '<div id="black-pawn2" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="a7">\n' +
    '<div id="black-pawn1" class="draggable" color="black">&#9823;</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="divTableRow">\n' +
    '<div class="divTableCell" id="h8">\n' +
    '<div id="black-rack2" class="draggable" color="black">&#9820;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="g8">\n' +
    '<div id="black-knight2" class="draggable" color="black">&#9822;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="f8">\n' +
    '<div id="black-bishop2" class="draggable" color="black">&#9821;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="e8">\n' +
    '<div id="black-king" class="draggable" color="black">&#9818;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="d8">\n' +
    '<div id="black-queen" class="draggable" color="black">&#9819;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="c8">\n' +
    '<div id="black-bishop1" class="draggable" color="black">&#9821;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="b8">\n' +
    '<div id="black-knight1" class="draggable" color="black">&#9822;</div>\n' +
    '</div>\n' +
    '<div class="divTableCell" id="a8">\n' +
    '<div id="black-rock1" class="draggable" color="black">&#9820;</div>\n' +
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

function layoutFixHeight() {
    $(".divTable").css({"height": $(".divTable").width() + "px"});
    $("#gameTable").css({"height": $(".divTable").width() + "px"});
    $("#main-chess").css({"height": $(".divTable").width() + "px"});
    $("#chat").css({"height": $(".divTable").width() + "px"});
}

function connect() {
    var webSocketUrl = 'ws://' + window.location.host + '/websocket';
    if (window.location.hash.length !== 0) {
        webSocketUrl = webSocketUrl + "?opp=" + window.location.hash.substring(1, window.location.hash.length)
    }
    websocket = new WebSocket(webSocketUrl);
    var move; // chess move log (e2-e4)

    function addDnD() {
        $(".draggable").draggable({
            start: function (event, ui) {
                move = $(this).parents(".divTableCell").attr("id");
            }
        });

        function killingFigure(elem, from) {
            debugger;
            if (from === undefined) {
                from = $(this).attr("id");
                move = move + " &rarr; X &rarr; " + from;
            } else {
                move = move + " &rarr; X";
            }
            var to;

            function toCemetery(color, e) {
                if ($(elem).attr("color").indexOf(color) !== -1 && $(e).attr("class").indexOf(color) === -1) {
                    if ($($(".cemetery-" + color)[0]).find(".draggable").size() / 2 * $(".draggable").height() > $($(".cemetery-" + color)[0]).height()) {
                        $($(".cemetery-" + color)[1]).append($(elem));
                        to = $($(".cemetery-" + color)[1]).attr("id");
                    } else {
                        $($(".cemetery-" + color)[0]).append($(elem));
                        to = $($(".cemetery-" + color)[0]).attr("id");
                    }
                } else if ($(elem).attr("color").indexOf(color) !== -1 && $(e).attr("class").indexOf(color) !== -1) {
                    if ($($(".cemetery-" + color)[0]).find(".draggable").size() / 2 * $(".draggable").height() > $($(".cemetery-" + color)[0]).height()) {
                        $($(".cemetery-" + color)[1]).append($(elem));
                        to = $($(".cemetery-" + color)[1]).attr("id");
                    } else {
                        $(e).append($(elem));
                        to = $(e).attr("id");
                    }
                }
            }

            toCemetery("black", elem);

            toCemetery("white", elem);

            var moveDiv = "<div class='mv-" + myFigureColor + "'>" + move + "</div>";
            $("#" + myFigureColor + "-moves").append(moveDiv);
            movesArray.push(new MoveNotification(moveDiv, $(elem).attr("color"), from, to, "MoveNotification"));
            move = "";
        }

        $("div[class^='cemetery-']").droppable({
            drop: function (event, ui) {
                debugger;
                killingFigure.call(this, event.toElement, move);
            }
        });

        $(".divTableCell").droppable({
            drop: function (event, ui) {
                if (move.indexOf($(this).attr("id")) === -1) {
                    debugger;
                    var from = move;
                    var to = $(this).attr("id");
                    if ($(this).children("div").length) {
                        movesArray.push(new MoveNotification("", myFigureColor, from, to, "MoveNotification"));
                        killingFigure.call(this, $(this).children("div"));
                    } else {
                        move = move + " &rarr; " + $(this).attr("id");
                        var moveDiv = "<div class='mv-" + myFigureColor + "'>" + move + "</div>";
                        $("#" + myFigureColor + "-moves").append(moveDiv);
                        movesArray.push(new MoveNotification(moveDiv, myFigureColor, from, to, "MoveNotification"));
                        move = "";
                    }
                    debugger;
                    $(event.toElement).css({top: 0, left: 0});
                    $(this).append($(event.toElement));
                }
            }
        });
    }

    function onMessage(evt) {
        var message = evt.data;
        if (message.indexOf("{") !== -1 && message.indexOf("MoveNotification") !== -1) {
            var json = JSON.parse(message);
            $('#button > input[type="button"]').prop('disabled', false);
            if (json.to.length === 2) { // regular cell. not cemetery
                resumeTimer();
            }
            if (json.div.length) {
                $("#" + json.div.substring(json.div.indexOf("mv-") + 3, json.div.indexOf("'>")) + "-moves").append(json.div);
            }
            $("#" + json.to).append($("#" + json.from).find("div[color=" + json.figureColor + "]"));
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
            if (window.location.href.indexOf("#") === -1) {
                $("#waiting span").html("<h1>Waiting for opponent <br>Chess board number: "
                    + message.substring('session:'.length, message.length)
                    + "</h1><br><br><h2>"
                    + window.location.origin + "/#" + message.substring('session:'.length, message.length)
                    + "</h2>");
            }
            $("#gameTable").append(gameTable);
            myFigureColor = "white";
            layoutFixHeight();
        } else if (message.indexOf("Connected to opponent") !== -1) {
            $('#button > input[type="button"]').prop('disabled', true);
            $("#gameTable").append(gameTableVerse);
            myFigureColor = "black";
            addDnD();
            layoutFixHeight();
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

    var typingInterval;
    setInterval(function () {
        if (!isTyping && isSent) {
            websocket.send(JSON.stringify(new Typing(false, "Typing")));
            isSent = false;
            clearInterval(typingInterval);
        }
    }, 2000);

    $("#inp textarea").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            websocket.send(JSON.stringify(new Message(myFigureColor, $("#inp textarea").val(), "Message")));
            $("#chatMessages").val($("#chatMessages").val() + "\n" + (myFigureColor + ": " + $("#inp textarea").val()));
            $("#inp textarea").val("");
            document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
            return;
        }

        isTyping = true;
        if (isTyping && !isSent) {
            websocket.send(JSON.stringify(new Typing(true, "Typing")));
            isSent = true;
        }

        typingInterval = setInterval(function () {
            isTyping = false;
        }, 1500);
    });

    $('#button > input[type="button"]').click(function () {
        pauseTimer();
        movesArray.forEach(function (s) {
            debugger;
            websocket.send(JSON.stringify(s));
        });
        movesArray = [];
        $('#button > input[type="button"]').prop('disabled', true);
    });
});

window.addEventListener("resize", function () {
    layoutFixHeight();
}, false);