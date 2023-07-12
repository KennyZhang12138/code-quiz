// Get Dom Elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// List of Questions and Answers
var questions = [
  {
    prompt:
      "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
    options: ["method", "assignment operator", "variable", "string"],
    answer: "variable",
  },

  {
    prompt: "Inside which HTML element do we put the JavaScript?",
    options: ["<javascript>", "<js>", "<script>", "<scripting>"],
    answer: "<script>",
  },
  {
    prompt: "How does a for loop start?",
    options: [
      "for (i = 0; i <= 3; i++)",
      "for (i = 0; i <= 3)",
      "for i = 1 to 3",
      " for (i <= 3; i++)",
    ],
    answer: "for (i = 0; i <= 3; i++)",
  },
  {
    prompt: "How do you call a function named myFunction?",
    options: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction",
      "Call.myFunction",
    ],
    answer: "myFunction()",
  },

  {
    prompt: "In JavaScript, which of the following is a logical operator?",
    options: ["|", "&&", "%", "/"],
    answer: "&&",
  },
];

// Quiz's initial state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
// Start quiz and hide frontpage

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  var landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

// End quiz if timer reaches 0

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words");
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

// Check for right answers and deduct time for wrong answer, go to next question
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// Save score in local storage along with users' name

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    location.replace("highscores.html");
  }
}

// Save users' score after clicking submit
submitBtn.onclick = saveHighscore;
// Start quiz after clicking start quiz
startBtn.onclick = quizStart;
