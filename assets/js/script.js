// complete question list already set in './js/questions.js'
// define button elements
var startQuizEl = document.getElementById("start-btn");
var nextBtnEl = document.getElementById("next-btn");

// define screen to display
var introScreen = document.getElementById("intro-screen");
var questionsScreen = document.getElementById("display-questions");
var resultsScreen = document.getElementById("result-container");

// define containers to hold questions and choices
// var availableQuestionsArr = [];
var questionDisplayEl = document.getElementById("question-container");
var choiceDisplayEl = document.getElementById("choice-container");

// define timer elements
var timerEl = document.getElementById("timer");

// preset variables
let questionCount = 0;
let choiceCount = 1;
let timer = 10;

var startQuizHandler = function() {
    // change screens
    introScreen.style.display = "none";
    questionsScreen.style.display = "block";
    // begin timer, load questions
    startCountdown();
    questionDisplayHandler();
};

// timer countdown
var startCountdown = function () {
    setInterval(function() {
        timer --;
        timerEl.innerHTML = "Time Remaining: " + timer + "s";
        if (timer < 0) {
            // if timer = 0, end quiz and go directly to the results screen
            timerEl.innerHTML = "Time's Up!"
            return clearInterval(startCountdown);
        }
    }, 1000);
}

var questionDisplayHandler = function() {
    // display question one at a time
    questionDisplayEl.textContent = questionsListArr[questionCount].q;

    // display all options for current question
    for (const [key, value] of Object.entries(questionsListArr[questionCount].options)) {
        // creating <li id="choice-btn" choiceId="choiceCount"> element
        var choice = document.createElement("li");
        choice.className = "choice-btn"
        choice.setAttribute("choiceId", choiceCount);
        choice.innerHTML = key + ": " + value;
        choiceDisplayEl.appendChild(choice);
        choiceCount ++;
    }
};

// validate choice selection
choiceDisplayEl.onclick = function(event) {
    // get and store dynamically generated choiceId
    var getChoiceId = event.target.getAttribute("choiceId");
    // validate choice based on getChoiceId
    if (!getChoiceId) { return };
    // if correct, block mouseclick and highlight correct option green
    if (getChoiceId == questionsListArr[questionCount].answer) {
        event.target.classList.add("choice-right");
        // choiceId..querySelector('[choiceId='choiceCount']').className = "choice-right";
        choiceDisplayEl.style.pointerEvents = "none";
    }
    else {
        // if wrong, highlight wrong option red and reduce time by 10
        event.target.classList.add("choice-wrong");
        timer = timer - 10;
        timerEl.innerHTML = "Time Remaining: " + timer + "s";
    }
};

// listen to button click for next question
nextBtnEl.onclick = function() {
    // reset elements on button click for next question
    choiceDisplayEl.innerHTML = "";
    choiceCount = 1;
    choiceDisplayEl.style.pointerEvents = "auto";
    questionCount++;
    // check if all questions are done. if yes, move on to results
    if (questionCount === questionsListArr.length) {
        resultsDisplayHandler();
    }
    else {
        questionDisplayHandler(questionCount);
    }
};

var resultsDisplayHandler = function() {
    questionsScreen.style.display = "none";
    resultsScreen.style.display = "block";
    console.log("quiz is complete");
};

window.onload = function() {
    let introTextEl = document.querySelector("#instructions");
    console.log(introTextEl);
    introTextEl.innerHTML = "There are " + questionsListArr.length + " questions in total. Try to answer the following code-related questions within the time limit. Are you up for the challenge? <br /> (Keep in mind that incorrect answers will penalize your time by ten seconds!)"
    timerEl.innerHTML = "Time Remaining: " + timer + "s";
};

startQuizEl.addEventListener("click", startQuizHandler);