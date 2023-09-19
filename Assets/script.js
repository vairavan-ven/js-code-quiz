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
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Clear previous answer buttons
    answerButton.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(index));
        answerButton.appendChild(button);
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
        // End of the quiz
        endQuiz();
    }
}

function endQuiz() {
    questionElement.innerHTML = "Quiz Complete!";
    answerButton.innerHTML = "Your Score: " + score + " / " + questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.addEventListener("click", startQuiz);
}

// Start the quiz
startQuiz();
