const quizData = [
      // Define a dictionary type data with key-value pair
    {
        question: "How many years can a snail sleep for?",
        options: ["5", "134", "3" , "4" ],
        answer: "3"
    },

    {
        question: "What type of animal is a Flemish Giant?",
        options: ["Rabbit", "Elephant", "Lion" , "Whale" ],
        answer: "Rabbit"
    },

    {
        question: "How long does it take for a sloth to digest its food?",
        options: ["9 week", "1 day", "2 week" , "3 week" ],
        answer: "2 week"
    },
   
     
    {
        question: "What type of animal is a fer-de-lance?",
        options: ["Snake", "Frog", "Lizard" , "Fish" ],
        answer: "Snake"
    },

    {
        question: "What animal do I like??",
        options: ["Wolf", "Lion", "Cat" , "Dog" ],
        answer: "Wolf"
    },

    {
        question: "What animal do I like??",
        options: ["Wolf", "Lion", "Cat" , "Dog" ],
        answer: "Wolf"
    },

    {
        question: "Which animal has no vocal cords?",
        options: ["Fish", "Snake", "Bunny" , "Giraffe" ],
        answer: "Giraffe"
    },

    {
        question: "What is a rhino's horn made out of?",
        options: ["Keratin", "Bone", "Tooth" , "Paper"] ,
        answer: "Keratin"
    },

    {
        question: "Last question! The trumpeter swan — North America's largest water fowl — weighs about how many pounds?",
        options: ["10 pounds", "30 pounds", "20 pounds" , "40 pounds" ],
        answer: "30 pounds" 
    }
];


const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const optionsElement = document.getElementById('option-container');
const resultElement = document.getElementById('result')


let currentQuestion = 0;
let score = 0;

progressBar.style.width = '0%';


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none'; 
    progressBarContainer.style.display = 'block'; // to show progressbar container
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer); 

    if(currentQuestion < quizData.length)
    {
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // Set initial countdown value
        timerText.textContent = 15;

        // remove previous option buttons
        optionsElement.innerHTML = '';

        // Clone a button for each options in a question
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });

        // Start the countdown for the current question
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer for the next question
                clearInterval(timer);

                // Raise currentQuestion variable by 1
                currentQuestion++;

                loadQuestion();
            }
        }, 1000);
    }else{
        endQuiz();
    }
}

function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];
    if(option === currentQuizData.answer)
    {
        score++; 
    }
    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}

function endQuiz()
{
    progressBarContainer.style.display = 'none';
    timerElement.style.display = 'none';
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
}