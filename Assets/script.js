const quizForm = document.getElementById('quiz-form');
const questionBoxes = document.querySelectorAll('.question-box');
const scoreReport = document.querySelector('.score-report');
const submitScoreButton = document.getElementById('submit-score');
const initialsInput = document.getElementById('initials');
const highscoresPage = document.querySelector('.highscores-page');
const highscoresList = document.getElementById('highscoresList');
const startButton = document.getElementById('startButton');
const timerNumber = document.getElementById('timer-number');
const timer = document.getElementById('timer');
const messageBox = document.querySelector('.message');
const confirmScoreSubmit = document.querySelector('.confirm-score-submit');
const highscoresButton = document.getElementById('highscores');
const backButton = document.getElementById('back-btn');
const question1 = document.querySelector('.Q1');
const question2 = document.querySelector('.Q2');
const question3 = document.querySelector('.Q3');
const question4 = document.querySelector('.Q4');

let currentQuestion = 0;
let score = 0;
let secondsLeft = 60;
let timerInterval; null








// Function to start the quiz
function startQuiz() {
    console.log('Starting Quiz...')
    startButton.style.display = 'none';
    console.log(questionBoxes[0])
    questionBoxes[currentQuestion].style.display = 'block';
    startTimer();

   

  }
  

// Function to start the timer
function startTimer() {
    console.log('Starting Timer...')
  timerInterval = setInterval(function() {
    secondsLeft--;
    timerNumber.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizForm.style.display = 'none';
  scoreReport.style.display = 'block';
  document.getElementById('score').textContent = score;
}

// Function to handle a user's answer to a question
function answerQuestion(event) {
    console.log(event);
  event.preventDefault();

  const selectedButton = event.target;
  const direction = parseInt(selectedButton.dataset.direction);

  if (direction === 1) {
    // User answered correctly
    score++;
    messageBox.textContent = 'Correct!';
  } else {
    // User answered incorrectly
    secondsLeft -= 10;
    messageBox.textContent = 'Wrong!';
  }

  // Show the next question or end the quiz
  currentQuestion++;
  if (currentQuestion < questionBoxes.length) {
    questionBoxes[currentQuestion - 1].style.display = 'none';
    questionBoxes[currentQuestion].style.display = 'block';
  } else {
    endQuiz();
  }
}

// Function to handle submitting the score
function submitScore(event) {
  event.preventDefault();

  const initials = initialsInput.value.trim();

  if (initials === '') {
    return;
  }

  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscores.push({ initials, score });
  localStorage.setItem('highscores', JSON.stringify(highscores));

  scoreReport.style.display = 'none';
  initialsInput.value = '';
  confirmScoreSubmit.style.display = 'block';
}

// Function to show the highscores page
function showHighscores() {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscoresList.innerHTML = '';
  for (let i = 0; i < highscores.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${highscores[i].initials}: ${highscores[i].score}`;
    highscoresList.appendChild(li);
  }
  homeButton.style.display = 'block';
  highscoresButton.style.display = 'none';
  questionSet.style.display = 'none';
  highscoresPage.style.display = 'block';
}

// Function to go back to the home page
function goHome() {
  location.reload();
}

startButton.addEventListener('click', startQuiz);


// Hide all question boxes except the first one
for (let i = 1; i < questionBoxes.length; i++) {
  questionBoxes[i].classList.add("hidden");
}

// Show the first question box and hide the start button when the user clicks the start button
startButton.addEventListener("click", function() {
  questionBoxes[0].classList.remove("hidden");
  document.getElementById("Start").classList.add("hidden");
});

// Add event listeners to answer buttons
const answerButtons = document.querySelectorAll('.answer');
answerButtons.forEach(button => {
button.addEventListener('click', answerQuestion);
});

// Add event listener to submit score button
submitScoreButton.addEventListener('click', submitScore);

// Add event listener to highscores button
highscoresButton.addEventListener('click', showHighscores);

// Add event listener to back button
backButton.addEventListener('click', goHome);

function answerQuestion(event) {
    event.preventDefault();
  
    const selectedButton = event.target;
    const direction = parseInt(selectedButton.dataset.direction);
  
    if (direction === 1) {
      // User answered correctly
      score++;
      messageBox.textContent = 'Correct!';
    } else {
      // User answered incorrectly
      secondsLeft -= 10;
      messageBox.textContent = 'Wrong!';
    }
  
    // Show the next question or end the quiz
    currentQuestion++;
    if (currentQuestion < questionBoxes.length) {
      questionBoxes[currentQuestion - 1].style.display = 'none';
      questionBoxes[currentQuestion].style.display = 'block';
    } else {
      endQuiz();
    }
  }
  





























