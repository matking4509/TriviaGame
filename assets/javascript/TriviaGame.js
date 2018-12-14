// Toggle console.logs for debugging, and write debug function.
var debugLogs = true;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log("dbg - ", label, output);
    }
};

// Starting Variables

// var curScore = correctQ / totalQ * 100;
var counterInt;
var correctQ = 2;
var countQ = 2;
var wins = 0;
var questionId = 0;
var counterObj = {
    counter : 10
}
var questionLibraryObj = {
    question : [ "What is 1 + 1?",
                 "What colour is an Orange?"],
    correctA : [ "2", 
                 "Orange" ],
      decoyA : [ [ "3","4","1" ], 
                 ["red","blue","green"] 
               ]
};

// debugPrint("Test Colour: ", questionLibrary.decoyA[1][1]);

function writeScore () {
    $("#currentScore").html("Current Score: " + (correctQ / countQ * 100) + "%");

}

function writeRecord() {
    $("#winLossRecord").html("Wining Games: " + wins);
}

function pickQuestion() {
    questionId = Math.floor(Math.random()*questionLibraryObj.question.length);
    spliceIndex = Math.floor(Math.random()*4);
    debugPrint("Question Index: " + questionId);
    debugPrint("Splice Index: " + spliceIndex);
}

function writeQandA() {
    var qCard = $("<div>");
        qCard.addClass("card text-center")
        qCard.html("<p>" + questionLibraryObj.question[questionId] + "</p>");
        qCard.appendTo("#questions");
    var aCard = $("<div>");
        aCard.addClass("card text-center");
        aCard.attr("id","answerCard");
        aCard.html("<p>Answers Here</p>");
        aCard.appendTo("#answers");
        $("#answerCard").append("1: " + questionLibraryObj.decoyA[1][1]);
}

function timesUp() {

}

function startTimer() {
    writeScore();
    writeRecord();
    pickQuestion();
    writeQandA();
    clearInterval(counterInt);
    counterInt = setInterval(countDown, 1000);
    
}

function resetTimer() {
    clearInterval(counterInt);
}

function countDown() {
    counterObj.counter--;
    $("#timerDiv").html("Time Left: " + counterObj.counter + " Seconds");
}


// counterInt = setInterval(stopwatch.count, 1000);