// Array containing question objects with properties such as the question, options, and answer
// const questions = [
//     {
//         questionText: "Which is the largest planet in our solar system?",
//         options: ["Earth", "Mars", "Saturn", "Jupiter", "Neptune"],
//         answer: "Jupiter"
//     },
//     {
//         questionText: "What is the hardest natural substance on Earth?",
//         options: ["Gold", "Iron", "Diamond", "Quartz", "Granite"],
//         answer: "Diamond"
//     },
//     {
//         questionText: "Who was the first person to walk on the Moon?",
//         options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins", "Alan Shepard"],
//         answer: "Neil Armstrong"
//     },
//     {
//         questionText: "Which element has the chemical symbol 'O'?",
//         options: ["Osmium", "Oxygen", "Oganesson", "Oxide", "Orpiment"],
//         answer: "Oxygen"
//     },
//     {
//         questionText: "Which country is known as the Land of the Rising Sun?",
//         options: ["China", "South Korea", "India", "Japan", "Thailand"],
//         answer: "Japan"
//     },
//     {
//         questionText: "What is the longest river in the world?",
//         options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River", "Congo River"],
//         answer: "Nile River"
//     },
//     {
//         questionText: "Which programming language is primarily used for web development?",
//         options: ["Python", "C++", "JavaScript", "Swift", "Go"],
//         answer: "JavaScript"
//     },
//     {
//         questionText: "Which continent has the most countries?",
//         options: ["Asia", "Africa", "Europe", "South America", "North America"],
//         answer: "Africa"
//     },
//     {
//         questionText: "Which instrument is used to measure temperature?",
//         options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer", "Altimeter"],
//         answer: "Thermometer"
//     },
//     {
//         questionText: "Who wrote the play 'Romeo and Juliet'?",
//         options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
//         answer: "William Shakespeare"
//     }
// ];

const questions = [
    {
        questionText: "Who is credited with inventing the practical induction motor?",
        options: ["Michael Faraday", "Nikola Tesla", "Galileo Ferraris", "Thomas Edison"],
        answer: "Nikola Tesla"
    },
    {
        questionText: "What powers an induction motor?",
        options: ["Direct Current (DC)", "Alternating Current (AC)", "Battery cells", "Permanent magnets"],
        answer: "Alternating Current (AC)"
    },
    {
        questionText: "What part of the induction motor rotates?",
        options: ["Stator", "Shaft", "Rotor", "Fan cover"],
        answer: "Rotor"
    },
    {
        questionText: "What is the function of the stator?",
        options: ["To rotate with the rotor", "To create a rotating magnetic field", "To reduce mechanical friction", "To cool the motor"],
        answer: "To create a rotating magnetic field"
    },
    {
        questionText: "The principle of induction motors is based on:",
        options: ["Ohm’s Law", "Electromagnetic Induction", "Fleming’s Right Hand Rule", "Newton’s Law"],
        answer: "Electromagnetic Induction"
    },
    {
        questionText: "What happens to rotor speed compared to synchronous speed?",
        options: ["Rotor runs faster than synchronous speed", "Rotor runs at synchronous speed", "Rotor runs slightly less than synchronous speed", "Rotor speed is random"],
        answer: "Rotor runs slightly less than synchronous speed"
    },
    {
        questionText: "Which of these is a common application of induction motors?",
        options: ["Ceiling fans", "Mobile phones", "Microprocessors", "Solar panels"],
        answer: "Ceiling fans"
    },
    {
        questionText: "What are the two main types of induction motors?",
        options: ["DC & AC Motors", "Single-phase & Three-phase", "Series & Shunt", "Servo & Stepper"],
        answer: "Single-phase & Three-phase"
    }
];

// Getting javascript objects for each element
const startBtn = document.querySelector("#start-btn");
const startScreen = document.querySelector(".start-screen");
const questionScreen = document.querySelector(".questions-screen");
const endScreen = document.querySelector(".end-screen");
const progressBar = document.querySelector("progress");
const scoreParagraph = endScreen.querySelector(".desc");
const restartBtn = endScreen.querySelector(".btn");
const displayMsg = endScreen.querySelector("h2");

// Declaring variables to keep track of score and question #
let score = 0;
let questionNum = 1;

// Function to add a new question to the container, after receiving question object
function addQuestion(questionObject) {
    // logic to create new question and prepend to question screen
    const newQuestion = document.createElement("div");
    newQuestion.classList.add("question-container");
    newQuestion.innerHTML = `  <h2 class="question-text">${questionObject.questionText}</h2>
                            <div class="score-header">
                                <p id="question-number">Question ${questionNum} of ${questions.length}</p>
                                <p id="score">Score: ${score}</p>
                            </div>
                            <div class="answers">
                            </div>`
    
    const answers = newQuestion.querySelector(".answers");
    questionObject.options = shuffle(questionObject.options); // will shuffle options each time
    questionObject.options.forEach(option => {
        const answerBtn = document.createElement("button");
        answerBtn.innerText = option;
        answers.append(answerBtn);
    })
    
    questionScreen.prepend(newQuestion);

    checkAnswer(questionObject, newQuestion); // calling function to check answer
    questionNum += 1; // updating question num
}

// function to check user answer
function checkAnswer(questionObject, newQuestion) {
    // checking if user clicks on one of the answer buttons
    const btnContainer = newQuestion.querySelector(".answers");
    btnContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const btn = event.target;
            
            // disabling buttons once user clicks on a button
            newQuestion.querySelectorAll("button").forEach(button => {
                button.disabled = true;
            });
            
            // logic to update score and add corresponding class base on user's answer
            if (questionObject.answer === btn.innerText) {
                btn.classList.add("correct");
                score += 1;
            } else {
                btn.classList.add("incorrect");
                const answerIndex = questionObject.options.indexOf(questionObject.answer);
                const answerBtn = newQuestion.querySelectorAll("button")[answerIndex];
                answerBtn.classList.add("correct");
            }
            removeQuestion(newQuestion); // remove question once user answer is checked
        }
    })
}

// function to remove question once user answers, and display a new question
// delay of 2 seconds is implemented
function removeQuestion(newQuestion) {
    updateProgress();
    setTimeout(() => {
        newQuestion.remove();
        updateQuestion(); 
    }, 2000);
}

// function will update the progress value and score -> is called once user clicks a button to answer
// delay of 1 second is added
function updateProgress() {
    const scoreObject = document.querySelector("#score");
    setTimeout(() => {
        if (questionNum === questions.length + 1) {
            progressBar.classList.add("progress-radius");
        }
        const step = 100/questions.length;
        animateProgressBar(progressBar, progressBar.value + step);
        scoreObject.innerText = `Score: ${score}`;
    }, 1000);
}

// function created to animate the progress bar
function animateProgressBar(progressBar, targetValue, duration = 500) {
    const startValue = progressBar.value;
    const valueDiff = targetValue - startValue;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        progressBar.value = startValue + valueDiff * progress;
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            progressBar.value = targetValue; // Ensure it ends exactly at target
        }
    }
    requestAnimationFrame(animate);
}

// function will update the old question, and display a new question -> till questions are left
function updateQuestion() {
    if (questionNum <= questions.length) {
        addQuestion(questions[questionNum - 1]);
    } else {
        displayEndScreen();
    }
}

// function to display the end screen once user finishes the quiz
function displayEndScreen() {
    questionScreen.classList.add("inactive");
    endScreen.classList.remove("inactive");
    scoreParagraph.innerText = `You scored ${score} out of ${questions.length}`;
    displayMsg.innerText = getMessage(score);
}

// function to get get message to display user once quiz is done -> based on score
function getMessage(score) {
    if (score <= 1) {
        return "Don’t Give Up! Try Again!";
    } else if (score < questions.length - 1) {
        return "Good Effort! Keep Learning!";
    } else if (score === questions.length - 1) {
        console.log(score);
        return "Great Job! So Close!";
    } else {
        return "Excellent! You Nailed It!";
    }
}

// function for resetting values like the score, progress, and question num if user choose to restart quiz
function restartQuiz() {
    questionNum = 1;
    score = 0;
    progressBar.value = 0;
    progressBar.classList.remove("progress-radius");
    questionScreen.classList.remove("inactive");
    endScreen.classList.add("inactive");
    addQuestion(questions[0]);
}

// function to shuffle array
const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

// executing the following if user clicks on the start button
// question screen will be displayed, and start screen will be put into an inactive state
startBtn.addEventListener("click", () => {
    startScreen.classList.add("inactive");
    questionScreen.classList.remove("inactive");
    addQuestion(questions[0]);
})

// listening for a click on the restart quiz button, which will excute the following function
restartBtn.addEventListener("click", () => {
    restartQuiz();
})
