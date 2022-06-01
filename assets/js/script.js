var startQuizBtnEl = document.getElementById("start-btn");
var quizContainerEl = document.querySelector("#quiz");

// start quiz
var startQuizHandler = function() {
    document.getElementById("intro-screen").style.display = "none";
    clearInterval(timerHandler);
    timerHandler();
    questionDisplay();
};

// start timer countdown
var timerEl = document.getElementById("timer");
var countdown = 5;
var timerHandler = function () {
    setInterval(function () {
        countdown --;
        timerEl.innerHTML = "Time remaining: " + countdown;
        if (countdown <= 0) {
            clearInterval(timerHandler);
            tryAgain();
        }
    }, 1000);
};

// reset quiz
var tryAgain = function () {
    countdown = 0;
    timerEl.innerHTML = "Quiz is done, put your mouses away!";
    var tryAgainEl = document.createElement("div");
    tryAgainEl.setAttribute("data-screen-id", "try-again");
};

// display questions
const questions = [
    {
        q: "What is the answer to this question?",
        options: ["no", "no", "no", "yes"],
        answer: 4
    }, 
    {
        q: "What is the answer to this question?",
        options: ["no", "yes", "no", "no"],
        answer: 2
    }, 
    {
        q: "What is the answer to this question?",
        options: ["yes", "no"],
        answer: 1
    }, 
    {
        q: "What is the answer to this question?",
        options: ["no", "no", "yes", "no"],
        answer: 3
    }
]
var questionDisplay = function () {

}

var resultContainerEl = document.getElementById("result-container");
window.onload = function () {
    resultContainerEl.style.display = "none";
};

// introScreenHandler();
startQuizBtnEl.addEventListener("click", startQuizHandler);

// // clear screen
// var clearScreenHandler = function () {
//     var clearScreen = quizContainerEl.getAttribute("data-screen-id");
//     quizContainerEl.remove(clearScreen);
// };