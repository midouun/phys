document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const questions = [
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Volt"],
            answer: "Newton"
        },
        {
            question: "Which of the following is a scalar quantity?",
            options: ["Velocity", "Acceleration", "Mass", "Force"],
            answer: "Mass"
        },
        {
            question: "What is the formula for Ohm's Law?",
            options: ["V = IR", "F = ma", "E = mc²", "P = VI"],
            answer: "V = IR"
        }
    ];

    let score = 0;
    let currentQuestionIndex = 0;

    function displayQuestion() {
        const q = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((option, index) => `
                    <button class="quiz-option" data-option="${option}">${option}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback"></div>
            <button id="next-question">Next Question</button>
        `;

        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', handleOptionClick);
        });
        document.getElementById('next-question').addEventListener('click', handleNextQuestion);
    }

    function handleOptionClick(event) {
        const selectedOption = event.target.dataset.option;
        const feedbackDiv = document.getElementById('quiz-feedback');
        const q = questions[currentQuestionIndex];

        if (selectedOption === q.answer) {
            score++;
            feedbackDiv.textContent = 'Correct!';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Incorrect. The correct answer was ${q.answer}.`;
            feedbackDiv.style.color = 'red';
        }

        // Disable all options after selection
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.disabled = true;
        });
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            quizContainer.innerHTML = `
                <div class="quiz-results">
                    <h3>Quiz Complete!</h3>
                    <p>You scored ${score} out of ${questions.length}.</p>
                </div>
            `;
        }
    }

    displayQuestion();
});
