const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const operatorEl = document.getElementById('operator');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');
const timeLeftEl = document.getElementById('timeLeft');

let correctAnswer;
let score = 0;
let timer;
let timeLeft = 10;
let questionActive = true;

function generateQuestion() {
  clearInterval(timer);
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  questionActive = true;
  timeLeft = 10;
  timeLeftEl.textContent = timeLeft;

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = Math.random() > 0.5 ? '+' : '-';

  let result = operator === '+' ? num1 + num2 : num1 - num2;
  correctAnswer = result;

  num1El.textContent = num1;
  num2El.textContent = num2;
  operatorEl.textContent = operator;

  // إنشاء خيارات الإجابة
  let answers = new Set();
  answers.add(correctAnswer);
  while (answers.size < 4) {
    answers.add(correctAnswer + Math.floor(Math.random() * 7) - 3);
  }

  [...answers].sort(() => Math.random() - 0.5).forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.className = 'option-btn';
    btn.onclick = () => checkAnswer(ans);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (questionActive) {
        questionActive = false;
        feedbackEl.textContent = '⌛ انتهى الوقت!';
        feedbackEl.style.color = 'red';
      }
    }
  }, 1000);
}

function checkAnswer(selected) {
  if (!questionActive) return;
  clearInterval(timer);
  questionActive = false;

  if (selected === correctAnswer) {
    feedbackEl.textContent = '✅ أحسنت! إجابة صحيحة';
    feedbackEl.style.color = 'green';
    score++;
  } else {
    feedbackEl.textContent = `❌ خطأ! الإجابة الصحيحة هي ${correctAnswer}`;
    feedbackEl.style.color = 'red';
  }
  scoreEl.textContent = `النقاط: ${score}`;
}

nextBtn.addEventListener('click', generateQuestion);

// ابدأ اللعبة فورًا
generateQuestion();
