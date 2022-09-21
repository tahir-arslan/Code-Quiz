# Quiz
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Description
A simple quiz with a basic and straight forward interface that displays questions from a question set. It is created using a combination of HTML, CSS, and JavaScript. The time is set and calculated based on the number of questions are in the `questions.js`, and a default time of 10 seconds per question is given to the user. 

A score is calculated based on the remaining time and the amount of questions that were selected correctly. This score is presented to the user at the end of the quiz, giving the user an option to save the score. A scoreboard is also viewable, along with the option to remove all saved data.

Upon selecting an option, the option will be highlighted green or red depending on if it is or is not correct. If the selection is wrong, the option will become unclickable to avoid multiple selections of the same option and unnecessary deduction of time. If the selection is correct, all options will be rendered unclickable. 

### Reflection
The goal of this project was to learn advanced JavaScript, how it can interact with the DOM, HTML, and the style sheet. 

During the creation of this process, the decision was made to not have any of the questions hard coded into the actual JavaScript logic, so everything is dynamically updated and generated based on the questions file, which can be found in `./assets/js/questions.js`. Due to this, questions are not restricted to having a set number of options. This means each question can have a different number of options as desired.

Learning how to manipulate variables, objects, arrays, and JSON objects was necessary to get the functionality to work correctly. 

### Screenshot
![Screenshot](/assets/images/screenshot.png)

## Table of Contents
[Usage](#usage)

[License(s)](#licenses)

[Questions](#questions)


## Usage
After cloning the repo, open the `index.html` and begin the quiz. The interface is simple and easy to follow. 

In order to change the question set, open the `questions.js` file in the `./assets/js/` filepath. Format must be followed correctly in order for the functionality to remain in tact. The format is that of an Array of Objects and is as follows:
```js
{
    q: "Insert question surrounded by quotations.",
    options: {
        A: "You can have",
        B: "as many options as required.",
        C: "Ensure at there is a comma at the end of each option",
        D: "except for the last option in the option set." 
    },
    answer: num
}
```

Just like the option set as described above, each question set must be seperated by a comma, until the last question set. ex: `{ ... }, { ... }, { ... }`

## License(s)
MIT


## Questions
My name is Arslan Tahir, the creator of this project. If you have any issues, comments, concerns, or questions regarding this project, feel free to contact me at tahir.arslan@gmail.com.

If you would like to check out my other projects, feel free to explore my !(GitHub Page)[https://github.com/tahir-arslan/].