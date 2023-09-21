const questions = [
    {
        question: "Which data type is NOT supported in JavaScript?",
        answers: [
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Character", correct: true },
            { text: "Object", correct: false },
        ],
    },
    {
        question: "What is the purpose of the 'if' statement in JavaScript?",
        answers: [
            { text: "To declare a variable", correct: false },
            { text: "To define a function", correct: false },
            { text: "To create a loop", correct: false },
            { text: "To make conditional decisions", correct: true },
        ],
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "string", correct: false },
            { text: "let", correct: false },
        ],
    },
    {
        question: "What does JavaScript allow you to add to web pages?",
        answers: [
            { text: "Images", correct: false },
            { text: "Interactivity", correct: true },
            { text: "Audio files", correct: false },
            { text: "Videos", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 60;
    updateTimerDisplay();
    nextButton.innerHTML = "Next";
    showQuestion();

    clearInterval(timerInterval);
    timerInterval = setInterval(decrementTimer, 1000);
}

function decrementTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        endQuiz();
    }
}

function updateTimerDisplay() {
    timerElement.textContent = "Time: " + timeRemaining + " seconds";
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answers[selectedIndex].correct) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionElement.innerHTML = "Quiz Complete!";
    answerButtons.innerHTML = "Your Score: " + score + " / " + questions.length;
    nextButton.innerHTML = "Save Score";
    nextButton.removeEventListener("click", startQuiz);
    nextButton.addEventListener("click", saveScore);
}

function saveScore() {
    const initials = prompt("Enter your initials:");
    if (initials) {
        alert("Score saved: " + score + " / " + questions.length + " by " + initials);
        startQuiz();
    }
}

startQuiz();
