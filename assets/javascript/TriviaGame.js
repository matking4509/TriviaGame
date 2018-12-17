// Toggle console.logs for debugging, and write debug function.
var debugLogs = false;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log("dbg - ", label, output);
    }
};

// Game Configuration Variables
var gameConfig= {
    counter : 6,
    totalQ : 10
}

var counterInt;
var correctQ;
var countQ;
var wins = 0;
var questionId = 0;
var state;

var questionLibraryObj = {
    question : [ "Acrophobia is the fear of ____?",
                 "Achluophobia is the fear of ____?",
                 "Barophobia is the fear of ____?",
                 "Chronomentrophobia is the fear of ____?",
                 "Domatophobia is the fear of ____?",
                 "Dystychiphobia is the fear of ____?",
                 "Elurophobia is the fear of ____?",
                 "Ephebiphobia is the fear of ____?",
                 "Gamophobia is the fear of ____?",
                 "Genuphobia is the fear of ____?",
                 "Hemophobia is the fear of ____?",
                 "Heliophobia is the fear of ____?",
                 "Iatrophobia is the fear of ____?",
                 "Koinoniphobia is the fear of ____?",
                 "Leukophobia is the fear of ____?",
                 "Lockiophobia is the fear of ____?",
                 "Mageirocophobia is the fear of ____?",
                 "Melanophobia is the fear of ____?",
                 "Nyctophobia is the fear of ____?",
                 "Obesophobia is the fear of ____?",
                 "Octophobia is the fear of ____?",
                 "Podophobia is the fear of ____?",
                 "Pteridophobia is the fear of ____?",
                 "Phobophobia is the fear of ____?",
                 "Samhainophobia is the fear of ____?",
                 "Selenophobia is the fear of ____?",
                 "Tonitrophobia is the fear of ____?",
                 "Tachophobia is the fear of ____?",
                 "Venustraphobia is the fear of ____?",
                 "Zoophobia is the fear of ____?"
                ],
    correctA : [ "heights", 
                 "darkness",
                 "gravity",
                 "clocks",
                 "houses",
                 "accidents",
                 "cats",
                 "teenagers",
                 "marriage",
                 "knees",
                 "blood",
                 "the sun",
                 "doctors",
                 "rooms full of people",
                 "the colour white",
                 "childbirth",
                 "cooking",
                 "the colour black",
                 "the dark",
                 "gaining weight",
                 "the figure 8",
                 "feet",
                 "ferns",
                 "phobias",
                 "halloween",
                 "the moon",
                 "thunder",
                 "speed",
                 "beautiful women",
                 "animals"
                ],
      decoyA : [ ["caves","large insects","Tom Cruise"], 
                 ["germs","rubber","cruise ships"],
                 ["pressure","storms","sailboats"],
                 ["very old men","beards","changing colours"],
                 ["domes","round objects","tents"],
                 ["80's Hair Bands","sticks and stones","reptiles"],
                 ["pick-up trucks","pyramids","bears"],
                 ["people named Pheobe","carrots","getting carsick"],
                 ["video games","board games","chewing gum"],
                 ["genitics","family members","public pools"],
                 ["Greek Letters","80's cartoons","emo music"],
                 ["helicoptors","space travel","the wind"],
                 ["sticky substances","insects","mice"],
                 ["money","cameras","having your picture taken"],
                 ["cancer","dirty dishes","flying baseballs"],
                 ["being trapped","locksmiths","norse mythology"],
                 ["magic","dinosaurs","clowns"],
                 ["moles","the sun","money"],
                 ["evil dead","trains","cuts"],
                 ["fat people","doctors","racoons"],
                 ["stop signs","spiders","movies"],
                 ["pods","shoes","closets"],
                 ["dinosaurs","flying lizards","statues"],
                 ["islands","clouds","gluten"],
                 ["people named Sam","rockets","witches"],
                 ["people named Selene","easy listening music","chairs"],
                 ["sore throats","stethescopes","wooden shoes"],
                 ["spinich","toolboxes/chests","nails"],
                 ["Self-Help Books","milk products","lightning"],
                 ["zoos","aliens","stand-up comedians"]
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
    debugPrint("Questions ID", questionId);
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
            correctQ++;
            alert("You are right!");
            $("#game").replaceWith("<div id=\"game\" class=\"row mt-2 mb-2 border\"></div>");
            writeScore();
            resetTimer();
            $("#timerDiv").html("<b>Time Left: </b> Please Wait");
            setTimeout(nextQ, 2000);
        } else {
            
            alert("Incorrect!  The correct answer was \"" + currentQuestionObj.decoy[spliceIndex] + "\".");
            $("#game").replaceWith("<div id=\"game\" class=\"row mt-2 mb-2 border\"></div>");
            writeScore();
            resetTimer();
            $("#timerDiv").html("<b>Time Left: </b> Please Wait");
            setTimeout(nextQ, 2000);
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
        alert("Times Up!  The correct answer was \"" + currentQuestionObj.decoy[spliceIndex] + "\".");
        resetTimer();
        $("#timerDiv").html("<b>Time Left: </b> Loading Next Question...");
        setTimeout(nextQ, 2000);
    }
}

function gameOver() {
    
    $("#timerDiv").html("<b>Time Left: </b>Game Over");
    clearInterval(counterInt);
    if ((Math.floor(correctQ / countQ * 100)) > 50) {
       wins++;
       state="Win!";
    } else {
        state="Lose!";
    }
    writeRecord();
    $("#game").html("<div id=\"gameover-div\" class=\"col text-center\"><p><h1>Game Over!</h1></p><p>You " + state + "</p><p>You answered " + correctQ + " correct out of " + gameConfig.totalQ + " for " + (Math.floor(correctQ / gameConfig.totalQ * 100)) + "%.</p></div></div>");
    var buttonDiv = $("<div>");
        buttonDiv.attr("id","button-div");
        buttonDiv.addClass("col align-self-center")
        buttonDiv.appendTo("#gameover-div");
    var restartGameBtn = $("<button>");
        restartGameBtn.text("New Game");
        restartGameBtn.attr("id","newGameBtn");
        restartGameBtn.appendTo("#gameover-div");
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