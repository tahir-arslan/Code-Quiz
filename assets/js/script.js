// complete question list already set in './js/questions.js'
// define button elements
var startQuizEl = document.getElementById("start-btn");
var nextBtnEl = document.getElementById("next-btn");
var viewScoresEl = document.getElementById("view-score");
var mainScreenBtnEl = document.getElementById("main-screen-btn");

// define screen to display
var introScreen = document.getElementById("intro-screen");
var questionsScreen = document.getElementById("display-questions");
var resultsScreen = document.getElementById("result-container");
var scoreDisplayHandler = document.getElementById("score-display");

// define containers to hold questions and choices
var questionDisplayEl = document.getElementById("question-container");
var choiceDisplayEl = document.getElementById("choice-container");

// define elements for data manipulation
let createNewInput = document.createElement("p");
var scoreDisplayEl = document.getElementById("score-data");
var inputTextEl = document.getElementById("input-name");
var saveDataBtn = document.getElementById("save-data-btn");
var deleteDataBtnEl = document.getElementById("delete-data-btn");

// obtain saved data. if none present, create an empty array.
var savedScoresArr = JSON.parse(localStorage.getItem("Scores"));

// define timer elements
var timerEl = document.getElementById("timer");

// preset variables
let questionCount = 0;
let choiceCount = 1;
var timerCountdown;
let timer;
let timePerQuestion = 10;
var totalCorrect = 0;
let score = 0;

var mainScreenHandler = function() {
    introScreen.style.display = "block";
    resultsScreen.style.display = "none";
    viewScoresEl.style.pointerEvents = "auto";
};

var startQuizHandler = function() {
    // disable view scores btn
    viewScoresEl.style.pointerEvents = "none";
    // change screens
    introScreen.style.display = "none";
    questionsScreen.style.display = "block";
    // begin timer, load questions
    startCountdown();
    questionDisplayHandler();
};

// timer countdown
var startCountdown = function () {
    timerCountdown = setInterval(function() {
        timer --;
        timerEl.innerHTML = "Time Remaining: " + timer + "s";
        if (timer <= 0) {
            // if timer <= 0, end quiz and go directly to the results screen
            timer = 0;
            timerEl.innerHTML = "Time's Up!"
            clearInterval(timerCountdown);
            calculateScore();
            return;
        }
    }, 1000);
};

var questionDisplayHandler = function() {
    // display question one at a time
    questionDisplayEl.textContent = (questionCount + 1) + ". " + questionsListArr[questionCount].q;

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
        totalCorrect ++;
        choiceDisplayEl.style.pointerEvents = "none";
    }
    else {
        // if wrong, disable, highlight wrong option red and reduce time by 10
        event.target.style.pointerEvents = "none";
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
    finalQuestionCheck();
};

var finalQuestionCheck = function() {
    if(questionCount === questionsListArr.length -1) {
        document.getElementById("next-btn").innerText = "Finish";
    }
    // check if all questions are done. if yes, move on to results
    if (questionCount === questionsListArr.length) {
        clearInterval(timerCountdown);
        timerEl.innerText = "Final Time: " + timer + "s!";
        calculateScore();
    }
    else {
        questionDisplayHandler(questionCount);
    }
};

var calculateScore = function() {
    score = Math.floor((1 +(totalCorrect / questionsListArr.length)) * timer);
    resultsDisplayHandler();
};

// display results screen with saved scores
var resultsDisplayHandler = function() {
    questionsScreen.style.display = "none";
    resultsScreen.style.display = "block";
    scoreDisplayHandler.innerText = "Results: " + score + " points";
    if (!savedScoresArr) {
        savedScoresArr = [];
    }
    for (count = 0; count < savedScoresArr.length; count++) {
        let displaySave = document.createElement("p");
        displaySave.innerText = savedScoresArr[count];
        scoreDisplayEl.appendChild(displaySave);
    }
};

var saveScore = function() {
    let nameInput = inputTextEl.value;
    // validate entry
    if (!nameInput) {
        return inputTextEl.placeholder = "Please enter a name to save your score."
    } else {
        // create score display and append
        let saveInput = nameInput + ": " + score + " points";
        createNewInput.innerText = saveInput;
        scoreDisplayEl.appendChild(createNewInput);
        // save to local storage
        if (!savedScoresArr) {
            savedScoresArr = [];
        }
        savedScoresArr.push(saveInput);
        localStorage.setItem("Scores", JSON.stringify(savedScoresArr));
        // disable save input
        inputTextEl.style.display = "none";
        saveDataBtn.style.display = "none";
    }
};

var deleteData = function() {
    localStorage.clear();
    if (savedScoresArr.length > 0) {
        scoreDisplayEl.innerHTML = "";
        createNewInput.innerText = ("All saves have been deleted");
        createNewInput.className = "deleted-data";
        createNewInput.style.color = "black";
        scoreDisplayEl.appendChild(createNewInput);
    }
};

var viewScoreScreen = function() {
    // hide name save if "see high scores" is pressed
    introScreen.style.display = "none";
    questionsScreen.style.display = "none";
    inputTextEl.style.display = "none";
    saveDataBtn.style.display = "none";
    resultsScreen.style.display = "block";
    clearInterval(timerCountdown);
    resultsDisplayHandler();
};

var refreshPage = function() {
    location.reload();
};

window.onload = function() {
    let introTextEl = document.querySelector("#instructions");
    introTextEl.innerHTML = "There are " + questionsListArr.length + " questions in total. Try to answer the following code-related questions within the time limit. Are you up for the challenge? <br /> (Keep in mind that incorrect answers will penalize your time by ten seconds!)"
    
    // update timer based on number of questions. default set to 10 seconds per question
    let totalQuestions = questionsListArr.length;
    timer = totalQuestions * timePerQuestion;
    timerEl.innerHTML = "Time Remaining: " + timer + "s";
};

startQuizEl.addEventListener("click", startQuizHandler);
viewScoresEl.addEventListener("click", viewScoreScreen);
mainScreenBtnEl.addEventListener("click", refreshPage);
saveDataBtn.addEventListener("click", saveScore);
deleteDataBtnEl.addEventListener("click", deleteData);