const quizData = [
    {
        question: "Qual é o título mais famoso de Nossa Senhora no Brasil?",
        options: ["Nossa Senhora de Fátima", "Nossa Senhora Aparecida", "Nossa Senhora de Lourdes", "Nossa Senhora das Graças"],
        answer: 1
    },
    {
        question: "Qual é o título de Nossa Senhora que significa 'Rainha dos Céus'?",
        options: ["Nossa Senhora de Fátima", "Nossa Senhora Aparecida", "Nossa Senhora da Glória", "Nossa Senhora das Dores"],
        answer: 2
    },
    {
        question: "Em que passagem bíblica Maria foi visitada pelo anjo Gabriel?",
        options: ["Lucas 1:26-38", "Mateus 2:1-12", "João 3:16", "Marcos 5:25-34"],
        answer: 0
    },
    {
        question: "Qual é a festa litúrgica que celebra a Assunção de Maria?",
        options: ["15 de Agosto", "25 de Dezembro", "8 de Dezembro", "31 de Maio"],
        answer: 0
    },
    {
        question: "Qual título de Nossa Senhora é celebrado como Padroeira de Portugal?",
        options: ["Nossa Senhora da Conceição", "Nossa Senhora Aparecida", "Nossa Senhora do Carmo", "Nossa Senhora de Lourdes"],
        answer: 0
    },
    {
        question: "Em qual cidade Nossa Senhora apareceu aos três pastorinhos em 1917?",
        options: ["Lourdes", "Fátima", "Paris", "Medjugorje"],
        answer: 1
    },
    {
        question: "Qual é o dogma que afirma que Maria foi concebida sem o pecado original?",
        options: ["Assunção de Maria", "Imaculada Conceição", "Maternidade Divina", "Virgindade Perpétua"],
        answer: 1
    },
    {
        question: "Qual é o título de Nossa Senhora que celebra seu papel de mãe da Igreja?",
        options: ["Nossa Senhora do Rosário", "Nossa Senhora Auxiliadora", "Nossa Senhora das Graças", "Nossa Senhora Mãe da Igreja"],
        answer: 3
    },
    {
        question: "Quem foi o Papa que proclamou o dogma da Assunção de Maria em 1950?",
        options: ["Papa João Paulo II", "Papa Pio XII", "Papa Paulo VI", "Papa João XXIII"],
        answer: 1
    },
    {
        question: "Em qual local Maria fez seu primeiro milagre ao pedir a intercessão de Jesus?",
        options: ["Caná da Galileia", "Belém", "Jerusalém", "Nazaré"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;
let playerName = "";

function startQuiz() {
    const nameInput = document.getElementById("player-name").value.trim();
    if (nameInput) {
        playerName = nameInput;
        document.getElementById("start-container").classList.add('hidden');
        document.getElementById("quiz-container").classList.remove('hidden');
        loadQuestion();
    } else {
        alert("Por favor, digite seu nome.");
    }
}

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    const questionData = quizData[currentQuestionIndex];
    
    let optionsHtml = questionData.options.map((option, index) => {
        return `<button class="option-button" onclick="checkAnswer(${index})">${option}</button>`;
    }).join("");

    quizContainer.innerHTML = `<h2>${questionData.question}</h2>${optionsHtml}`;
}

function checkAnswer(selectedIndex) {
    const questionData = quizData[currentQuestionIndex];
    
    if (selectedIndex === questionData.answer) {
        updateScore();
        nextQuestion();
    } else {
        document.querySelectorAll('.option-button')[selectedIndex].disabled = true; 
        attempts++;
    }
}

function updateScore() {
    const points = attempts === 0 ? 20 : attempts === 1 ? 15 : attempts === 2 ? 10 : 5;
    score += points;
    attempts = 0;
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("quiz-container").classList.add('hidden');
    document.getElementById("ranking-container").classList.remove('hidden');
    saveScore();
    showRanking();
}

function saveScore() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push({ name: playerName, score: score });
    ranking.sort((a, b) => b.score - a.score); 
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function showRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    const rankingBody = document.getElementById("ranking-body");
    rankingBody.innerHTML = ranking.map((entry, index) => 
        `<tr><td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td></tr>`
    ).join("");
}

function restartQuiz() {
    // Resetar variáveis de estado para o próximo jogador
    currentQuestionIndex = 0;
    score = 0;
    attempts = 0;
    playerName = "";

    // Voltar para o início
    document.getElementById("ranking-container").classList.add('hidden');
    document.getElementById("start-container").classList.remove('hidden');
}

function resetRanking() {
    localStorage.removeItem("ranking");
    showRanking();  // Atualiza o quadro de ranking para mostrar que está vazio
}
