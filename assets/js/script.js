var startQuizBtnEl = document.getElementById("start-btn");
var quizContainerEl = document.querySelector("#quiz");

// start quiz
var startQuizHandler = function() {
    document.getElementById("intro-screen").style.display = "none";
    quizContainerEl2.style.display = "block";
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

var questionText = document.getElementById("question"); //questionNumber
var choiceContainer = document.getElementById("choice-container"); //optionContainer

var questionCounter = 0;
let currentQuestion;
var availableQuestions = [];
var availableOptions = [];

// push remaining questions into availableQuestions array
var setAvailableQuestions = function () {
    const totalQuestions = questions.length; // questions = quiz
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(questions[i]); 
    };
};

// set question, question number, and options
var getNewQuestion = function () {
    // set question text and get random question
    var questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get position of 'questionIndex' from availableQuestion array
    var index1 = availableQuestions.indexOf(questionIndex);
    // remove questionIndex from availableQuestion Array so no repeating questions
    availableQuestions.splice(index1, 1);

    // set options and get length of options
    var optionLength = currentQuestion.options.length;
    // push options into availableOptions array
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i);
    };
    // create options in innerHTML
    for (let i = 0; i < optionLength; i++) {
        // random option
        var optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get position of optionIndex from availableOptions
        var index2 = availableOptions.indexOf(optionIndex);
        // remove the optionIndex from availableOptions, so options do not repeat 
        availableOptions.splice(index2,1);
        
        var option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.className = "option";
        choiceContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    };
    questionCounter++;
};

// get result of current attempt
var getResult = function (element) {
    var id = parseInt(element.id);
    console.log(element.id);
    // get answer by comparing id of clicked option
    if(id === currentQuestion.answer) {
        element.classList.add("correct");
    } else {
        console.log("answer is wrong");
    }
}

var next = function () {
    if (questionCounter === questions.length) {
        console.log("quiz over");
    } else {
        getNewQuestion();
    }
}

var questionDisplay = function () {
    
}

var resultContainerEl = document.getElementById("result-container");
var quizContainerEl2 = document.getElementById("display-questions");
window.onload = function () {
    setAvailableQuestions();
    getNewQuestion();
    resultContainerEl.style.display = "none";
    quizContainerEl2.style.display = "none";
};

// introScreenHandler();
startQuizBtnEl.addEventListener("click", startQuizHandler);

// // clear screen
// var clearScreenHandler = function () {
//     var clearScreen = quizContainerEl.getAttribute("data-screen-id");
//     quizContainerEl.remove(clearScreen);
// };