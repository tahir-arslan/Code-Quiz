// complete question list already set in questions.js, available via index.html script
var startQuizEl = document.getElementById("start-btn");
var nextBtnEl = document.getElementById("next-btn");

var introScreen = document.getElementById("intro-screen");
var questionsScreen = document.getElementById("display-questions");
var resultsScreen = document.getElementById("result-container");

var availableQuestionsArr = [];
var questionDisplayEl = document.getElementById("question-container");
var choiceDisplayEl = document.getElementById("choice-container");

let questionCount = 0;

// start quiz
var startQuizHandler = function() {
    // change screens
    introScreen.style.display = "none";
    questionsScreen.style.display = "block";
    // display questions
    questionDisplayHandler();
}

var questionDisplayHandler = function() {
    // else {
    //     console.log(questionCount);
    //     questionDisplayHandler(questionCount);
    // }
    // display question one at a time
    questionDisplayEl.textContent = questionsListArr[questionCount].q;
    // display all options for current question

    for (const [key, value] of Object.entries(questionsListArr[questionCount].options)) {
        // creating <li id="choice-btn" choiceId="choiceIdCounter"> element
        // let choiceId = 1
        var choice = document.createElement("li");
        choice.className = "choice-btn"
        // choice.setAttribute("choiceId", choiceId);
        choice.innerHTML = key + ": " + value;
        // choiceId++
        console.log(choice);
        choiceDisplayEl.appendChild(choice);
    }

    console.log(questionsListArr);
    console.dir(questionsListArr);
    nextBtnEl.onclick = function() {
        // clear choices container on each next button click
        choiceDisplayEl.innerHTML = "";
        questionCount++;
        if (questionCount === questionsListArr.length) {
            resultsScreen();
        }
        else {
            questionDisplayHandler(questionCount);
        }
    }

    var resultsScreen = function() {
        questionsScreen.style.display = "none";
        resultsScreen.style.display = "block";
        console.log("quiz is complete");
    }

    //             // creating <li id="choice-btn" choiceId="choiceIdCounter"> element
    //             var choice = document.createElement("li");
    //             choice.className = "choice-btn"
    //             choice.setAttribute("choiceId", eachOption);
    //             choice.innerHTML = questionsListArr[questionCounter].options[choiceIdCounter];
    //             choiceDisplayEl.appendChild(choice);




    // function next(question){
    //     console.log("inside" + question);
    //     return question++;
    // }
    // console.log("outside" + question);

    // questionDisplayEl.appendChild(questionsListArr[question].q);
    // questionDisplayEl.appendChild(questionsListArr[eachQuestion].q);
    // questionDisplayEl.textContent = questionsListArr[eachQuestion].q;
    // for (question = 0; question < questionsListArr.length; questions++)
    //     console.log(element);
};






    //jsonQuestionObj = JSON.parse(JSON.stringify(questionsListArr));
    // begin quiz
    // questionsListArr.forEach(qSetObj=>{
    //     console.log(qSetOb.qj);
    //     questionDisplayEl.appendChild(qSetObj.q);

    //     Object.entries(qSetObj.options).forEach(([key, value])=>{
    //         console.log(key + " : " + value);
    //         var choice = document.createElement("li");
    //         choice.className = "choice-btn"
    //         choice.setAttribute("choiceId", eachOption);
    //         choice.innerHTML = value;
    //         choiceDisplayEl.appendChild(choice);
    //     });

        // qSetObj.options.forEach(questionObj =>{
        //     console.log(questionObj);
        //     var choice = document.createElement("li");
        //     choice.className = "choice-btn"
        //     choice.setAttribute("choiceId", eachOption);
        //     choice.innerHTML = qSetObj;
        //     choiceDisplayEl.appendChild(choice);
        // })
        // console.log(qSetObj.answer);
// };


    //    questionsListArr[i].options.length
    //     id: 1
    //     q: "What is the answer?",
    //     options: {
    //         A: "No",
    //         B: "No",
    //         C: "No:",
    //         D: "Yes"
    //     },
    //     answer: 4
    // },
    
    // // begin quiz
    // for (let i = 0; eachQuestion < questionsListArr.length; eachQuestion++) {
    //     // display question
    //     questionDisplayEl.appendChild(questionsListArr[eachQuestion].q);
    //     // questionDisplayEl.textContent = questionsListArr[eachQuestion].q;
    //     // display all options for each question
    //     for (let j = 0; eachChoice < questionsListArr[eachQuestion].options.length; eachChoice++) {

// questionsListArr[i].options.length


    //             // creating <li id="choice-btn" choiceId="choiceIdCounter"> element
    //             var choice = document.createElement("li");
    //             choice.className = "choice-btn"
    //             choice.setAttribute("choiceId", eachOption);
    //             choice.innerHTML = questionsListArr[questionCounter].options[choiceIdCounter];
    //             choiceDisplayEl.appendChild(choice);
    //         }
    //     }
        // for (let eachChoice in questionsListArr.options) {
        //     // creating <li id="choice-btn" choiceId="choiceIdCounter"> element
        //     var choice = document.createElement("li");
        //     choice.className = "choice-btn"
        //     choice.setAttribute("choiceId", eachOption);
        //     choice.innerHTML = questionsListArr[questionCounter].options[choiceIdCounter];
        //     choiceDisplayEl.appendChild(choice);
        // }
//         console.log(questionsListArr[eachQuestion].options);
//     }
//     console.log(questionsListArr[0].q);
//     console.dir(questionsListArr);
// };

window.onload = function() {
    let introTextEl = document.querySelector("#instructions");
    console.log(introTextEl);
    introTextEl.innerHTML = "There are " + questionsListArr.length + " questions in total. Try to answer the following code-related questions within the time limit. Are you up for the challenge? <br /> (Keep in mind that incorrect answers will penalize your time by ten seconds!)"
}

startQuizEl.addEventListener("click", startQuizHandler);
// add event listener to go to next question
// nextBtnEl.addEventListener("click", next);