document.addEventListener('DOMContentLoaded', function() {
    // Apply background gradient
    const body = document.querySelector('body');
    body.style.background = 'linear-gradient(to right, #f0f2f5, #0073e6)';
    body.style.color = '#333'; // Set text color for better readability

    // Highlight QA section
    const qaContainer = document.querySelector('.qa-container');
    if (qaContainer) {
        qaContainer.style.backgroundColor = '#fffff7'; // Light yellow background
        qaContainer.style.border = '2px solid #0073e6'; // Blue border to highlight
        qaContainer.style.borderRadius = '8px'; // Rounded corners
        qaContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'; // Deeper shadow for prominence
        qaContainer.style.padding = '20px'; // Padding
        qaContainer.style.margin = '20px'; // Margin
        qaContainer.style.position = 'relative'; // For positioning the highlight effect

        // Add highlight effect
        const highlightEffect = document.createElement('div');
        highlightEffect.style.position = 'absolute';
        highlightEffect.style.top = '0';
        highlightEffect.style.left = '0';
        highlightEffect.style.width = '100%';
        highlightEffect.style.height = '100%';
        highlightEffect.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0))';
        highlightEffect.style.borderRadius = '8px';
        highlightEffect.style.pointerEvents = 'none'; // Ensure it doesn't interfere with clicking
        qaContainer.appendChild(highlightEffect);
    }

    // Apply styles to other sections as needed...

    // Question and Answer functionality
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionsList = document.getElementById('questionsList');

    if (addQuestionBtn && questionsList) {
        addQuestionBtn.addEventListener('click', function() {
            const questionInput = document.getElementById('questionInput');
            const questionText = questionInput.value.trim();

            if (questionText) {
                // Create question item
                const questionItem = document.createElement('div');
                questionItem.className = 'question-item';
                questionItem.innerHTML = `
                    <h2>${questionText}</h2>
                    <button class="delete-question">Delete Question</button>
                    <div class="answer-form">
                        <textarea placeholder="Type your answer here..."></textarea>
                        <button class="addAnswerBtn">Add Answer</button>
                    </div>
                    <div class="answers-list"></div>
                `;
                
                // Append question item to the questions list
                questionsList.appendChild(questionItem);
                questionInput.value = ''; // Clear the input field

                // Save the updated questions to localStorage
                saveQuestions();
            }
        });

        // Event delegation to handle dynamic content
        questionsList.addEventListener('click', function(event) {
            if (event.target && event.target.classList.contains('addAnswerBtn')) {
                const answerForm = event.target.parentElement;
                const answerInput = answerForm.querySelector('textarea');
                const answerText = answerInput.value.trim();
                
                if (answerText) {
                    // Create answer item
                    const answerItem = document.createElement('div');
                    answerItem.className = 'answer-item';
                    answerItem.innerHTML = `
                        <span>${answerText}</span>
                        <button class="delete-answer">Delete</button>
                    `;
                    
                    // Append answer item to the answers list
                    const answersList = answerForm.nextElementSibling;
                    answersList.appendChild(answerItem);
                    answerInput.value = ''; // Clear the textarea

                    // Save the updated questions to localStorage
                    saveQuestions();
                }
            } else if (event.target && event.target.classList.contains('delete-answer')) {
                const answerItem = event.target.parentElement;
                answerItem.remove(); // Remove the answer item

                // Save the updated questions to localStorage
                saveQuestions();
            } else if (event.target && event.target.classList.contains('delete-question')) {
                const questionItem = event.target.parentElement;
                questionItem.remove(); // Remove the question item and its answers

                // Save the updated questions to localStorage
                saveQuestions();
            }
        });

        function saveQuestions() {
            const questionsList = document.getElementById('questionsList');
            const questions = Array.from(questionsList.children).map(questionItem => {
                const questionText = questionItem.querySelector('h2').textContent;
                const answers = Array.from(questionItem.querySelectorAll('.answer-item span')).map(span => span.textContent);
                return { questionText, answers };
            });
            localStorage.setItem('questions', JSON.stringify(questions));
        }

        function loadQuestions() {
            const savedQuestions = localStorage.getItem('questions');
            if (savedQuestions) {
                const questions = JSON.parse(savedQuestions);
                const questionsList = document.getElementById('questionsList');
                
                questions.forEach(({ questionText, answers }) => {
                    // Create question item
                    const questionItem = document.createElement('div');
                    questionItem.className = 'question-item';
                    questionItem.innerHTML = `
                        <h2>${questionText}</h2>
                        <button class="delete-question">Delete Question</button>
                        <div class="answer-form">
                            <textarea placeholder="Type your answer here..."></textarea>
                            <button class="addAnswerBtn">Add Answer</button>
                        </div>
                        <div class="answers-list"></div>
                    `;
                    
                    // Append question item to the questions list
                    questionsList.appendChild(questionItem);
                    
                    // Add saved answers to the question item
                    const answersList = questionItem.querySelector('.answers-list');
                    answers.forEach(answerText => {
                        const answerItem = document.createElement('div');
                        answerItem.className = 'answer-item';
                        answerItem.innerHTML = `
                            <span>${answerText}</span>
                            <button class="delete-answer">Delete</button>
                        `;
                        answersList.appendChild(answerItem);
                    });
                });
            }
        }

        // Load saved questions on page load
        loadQuestions();
    }
});
