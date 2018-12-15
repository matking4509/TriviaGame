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
// var curScore = correctQ / totalQ * 100;
var counterInt;
var qTimeOut;
var correctQ = 0;
var countQ = 0;
var wins = 0;
var questionId = 0;
var currentCounter = gameConfig.counter;


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

// debugPrint("Test Colour: ", questionLibrary.decoyA[1][1]);

function gameStart() {
    writeScore();
    writeRecord();
    pickQuestion();
    writeQandA();
    // startTimer();
    // qTimeOut = setTimeout(nextQ,gameConfig.counter * 1000);
}
    
function writeScore () {
    if (countQ == 0) {
        $("#currentScore").html("Current Score: 100%");
    } else {
        $("#currentScore").html("Current Score: " + (Math.floor(correctQ / countQ * 100)) + "%");
    }
    debugPrint("Score Formula: ", correctQ + " / " + countQ + " * 100");

}

function writeRecord() {
    $("#winLossRecord").html("Wining Games: " + wins);
}

function pickQuestion() {
    countQ++;
    questionId = Math.floor(Math.random()*questionLibraryObj.question.length);
    spliceIndex = Math.floor(Math.random()*4);
    //Build Current Question Information
    // currentQuestionObj["decoy"] = shuffle(questionLibraryObj.decoyA[questionId]);
    currentQuestionObj["decoy"] = [];
    for (var i = 0; i < questionLibraryObj.decoyA[questionId].length; i++) {
        currentQuestionObj.decoy.push(questionLibraryObj.decoyA[questionId][i]);
    }
    currentQuestionObj["spliceIndex"] = spliceIndex;
    currentQuestionObj["question"] = questionLibraryObj.question[questionId];
    currentQuestionObj["decoy"].splice(spliceIndex, 0, questionLibraryObj.correctA[questionId]);

    //Debug Elements
    debugPrint("currentQuestionObk", currentQuestionObj);
    debugPrint("Question Index: " + questionId);
    debugPrint("Splice Index: " + spliceIndex);
    debugPrint(questionLibraryObj.decoyA[questionId]);   
}

function writeQandA() {
    if (countQ == gameConfig.totalQ + 1) {
        gameOver();
    } else {
    var qCard = $("<div>");
        qCard.addClass("card text-center");
        qCard.attr("id","questionCard");
        qCard.appendTo("#questions");
        $("#questionCard").html("<p>" + questionLibraryObj.question[questionId] + "</p>");
    
    var aCard = $("<div>");
        aCard.addClass("card text-center");
        aCard.attr("id","answerCard");
        aCard.appendTo("#answers");
        $("#answerCard").html("");
        for (var i = 0; i < 4; i++) {
            $("#answerCard").append("<p id=" + i + " class=\"answerBtn\">" + currentQuestionObj.decoy[i] + "</p>");
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
    $("#timerDiv").html("Time Left: " + currentCounter + " Seconds");
    if (currentCounter == 0) {
        currentCounter = gameConfig.counter;
        nextQ();
    }
}

function nextQ() {
    writeScore();
    writeRecord();
    pickQuestion();
    writeQandA();
}

function gameOver() {
    clearInterval(counterInt);
    $("#game").html("Game Over");
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
// counterInt = setInterval(stopwatch.count, 1000);