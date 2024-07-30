document.addEventListener('DOMContentLoaded', async () => {
    const page = document.body.getAttribute('data-page');
    const questionsContainer = document.getElementById('questions');
    const navContainer = document.getElementById('nav');
    let currentQuestion = 0;
    let questions = [];

    try {
        const response = await fetch('assets/data/problems.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        questions = data[page];
        if (questions && questions.length > 0) {
            displayQuestion(currentQuestion);  // Exibe a primeira questão ao carregar a página
            createNavigation();
        } else {
            questionsContainer.innerHTML = '<p>Nenhuma questão disponível para esta categoria.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        questionsContainer.innerHTML = `<p>Erro ao carregar os dados: ${error.message}. Tente novamente mais tarde.</p>`;
    }

    function displayQuestion(index) {
        if (index >= 0 && index < questions.length) {
            const question = questions[index];
            questionsContainer.innerHTML = `
                <div class="question active">
                    <h3>${question.titulo}</h3>
                    <p>${question.descricao}</p>
                    <pre>${question.codigo_principal}</pre>
                    <p>Outras formas de fazer:</p>
                    ${question.outras_formas.map(code => `<pre>${code}</pre>`).join('')}
                </div>
            `;
        }
    }

    function createNavigation() {
        navContainer.innerHTML = questions.map((_, index) => `<button class="nav-button" data-index="${index}">${index + 1}</button>`).join('');
        navContainer.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                currentQuestion = parseInt(e.target.getAttribute('data-index'));
                displayQuestion(currentQuestion);
            });
        });

        document.getElementById('prev').addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion(currentQuestion);
            }
        });

        document.getElementById('next').addEventListener('click', () => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                displayQuestion(currentQuestion);
            }
        });
    }
});
