const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "Which element's chemical symbol is O?",
        options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        answer: "Oxygen"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        answer: "Shakespeare"
    }
];

function displayQuiz() {
    const form = document.getElementById("quiz-form");
    form.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        const questionText = document.createElement("p");
        questionText.textContent = q.question;
        questionDiv.appendChild(questionText);
        q.options.forEach((option, i) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            const savedProgress = JSON.parse(sessionStorage.getItem("progress"));
            if (savedProgress && savedProgress[index] === option) {
                input.checked = true;
            }
        });
        form.appendChild(questionDiv);
    });
}

function saveProgress() {
    const form = document.getElementById("quiz-form");
    const progress = [];
    questions.forEach((q, index) => {
        const selectedOption = form.querySelector(`input[name="question${index}"]:checked`);
        progress.push(selectedOption ? selectedOption.value : null);
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

function calculateScore() {
    const form = document.getElementById("quiz-form");
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = form.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    localStorage.setItem("score", score);
    document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
}

document.getElementById("submit-btn").addEventListener("click", function() {
    calculateScore();
});

window.addEventListener("load", function() {
    displayQuiz();
    const form = document.getElementById("quiz-form");
    form.addEventListener("change", saveProgress);
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        document.getElementById("score").textContent = `Your score is ${savedScore} (from previous session).`;
    }
});
