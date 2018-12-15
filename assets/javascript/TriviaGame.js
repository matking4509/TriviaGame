// Toggle console.logs for debugging, and write debug function.
var debugLogs = true;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log("dbg - ", label, output);
    }
};

// Game Configuration Variables
var gameConfig= {
    counter : 5,
    totalQ : 10
}

var counterInt;
var correctQ;
var countQ;
var wins = 0;
var questionId = 0;


var questionLibraryObj = {
    question : [ "What is 1 + 1?",
                 "What colour is an Orange?",
                 "How much wood could a woodchuck chuck, if a woodchuch could chuck wood?"],
    correctA : [ "2", 
                 "Orange",
                 "1 Bucket" ],
      decoyA : [ [ "3","4","1" ], 
                 ["red","blue","green"],
                 ["14 Buckets", "3 Buckets", "42 Buckets", "6 Buckets"]
               ]
};
var currentQuestionObj = {};

function gameStart() {
    countQ = 0;
    correctQ = 0;
    nextQ();
}

function nextQ() {
    writeScore();
    writeRecord();
    pickQuestion();
    writeQandA();
}
    
function writeScore() {
    if (countQ == 0) {
        $("#currentScore").html("<b>Current Score: </b>100%");
    } else {
        $("#currentScore").html("<b>Current Score: </b>" + (Math.floor(correctQ / countQ * 100)) + "%");
    }
    debugPrint("Score Formula: ", correctQ + " / " + countQ + " * 100");

}

function writeRecord() {
    $("#winLossRecord").html("<b>Wining Games: </b>" + wins);
}

function pickQuestion() {
    countQ++;
    questionId = Math.floor(Math.random()*questionLibraryObj.question.length);
    spliceIndex = Math.floor(Math.random()*4);
    //Build Current Question Information
    currentQuestionObj["decoy"] = [];
    for (var i = 0; i < questionLibraryObj.decoyA[questionId].length; i++) {
        currentQuestionObj.decoy.push(questionLibraryObj.decoyA[questionId][i]);
    }
    currentQuestionObj["spliceIndex"] = spliceIndex;
    currentQuestionObj["question"] = questionLibraryObj.question[questionId];
    currentQuestionObj["decoy"].splice(spliceIndex, 0, questionLibraryObj.correctA[questionId]);

    //Debug Elements
    debugPrint("currentQuestionObk", currentQuestionObj);
    debugPrint("Question Index: ", questionId);
    debugPrint("Splice Index: ", spliceIndex);
    debugPrint("Decory Questions: ", questionLibraryObj.decoyA[questionId]);   
}

function writeQandA() {
    debugPrint("Question Count / Limit", countQ + " / " + gameConfig.totalQ);
    if (countQ == gameConfig.totalQ + 1) {
        gameOver();
    } else {
        $("#game").replaceWith("<div id=\"game\" class=\"row mt-2 mb-2 border\"><div id=\"questions\" class=\"col-6 text-center align-self-center\"></div><div id=\"answers\" class=\"col-6 text-center\"></div><div>"); //reinstate "crystals row"
    var qCard = $("<div>");
        qCard.addClass("card text-center textStyle");
        qCard.attr("id","questionCard");
        qCard.appendTo("#questions");
        $("#questionCard").html("<p class=\"my-auto\">" + questionLibraryObj.question[questionId] + "</p>");
    var aCard = $("<div>");
        aCard.addClass("card text-center textStyle");
        aCard.attr("id","answerCard");
        aCard.appendTo("#answers");
        $("#answerCard").html("");
        for (var i = 0; i < 4; i++) {
            // $("#answerCard").append("<p id=" + i + " class=\"answerBtn\">" + currentQuestionObj.decoy[i] + "</p>");
            var aBtn = $("<button>");
                aBtn.attr("id",i);
                aBtn.attr("width","50%");
                aBtn.addClass("answerBtn");
                aBtn.text(currentQuestionObj.decoy[i]);
                aBtn.appendTo("#answerCard");
        }
    checkAnswer();
    startTimer();
    };
}

function checkAnswer() {
    $(".answerBtn").click(function() {
        if (this.id == currentQuestionObj.spliceIndex) {
            console.log("You are right!");
            correctQ++;
            nextQ();
        }
    });
}

function startTimer() {
    currentCounter = gameConfig.counter;
    clearInterval(counterInt);
    counterInt = setInterval(countDown, 1000);
}

function resetTimer() {
    clearInterval(counterInt);
}

function countDown() {
    currentCounter--;
    $("#timerDiv").html("<b>Time Left: </b>" + currentCounter + "<b> Seconds</b>");
    if (currentCounter == 0) {
        currentCounter = gameConfig.counter;
        nextQ();
    }
}

function gameOver() {
    clearInterval(counterInt);
    if ((Math.floor(correctQ / countQ * 100)) > 50) {
       wins++;
    }
    writeRecord();
    $("#game").html("Game Over");
    var restartGameBtn = $("<button>");
        restartGameBtn.text("New Game");
        restartGameBtn.attr("id","newGameBtn");
        restartGameBtn.appendTo("#game");
    $("#newGameBtn").click(function (){
        gameStart();
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
};