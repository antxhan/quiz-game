import { db } from "../../../utils/db";

export function Answer(index, answer) {
  return `
      <button class="answer-button">
          <span>${index + 1}.</span>
          <span>${answer}</span>
      </button>
      `;
}

function handleAnswer(button) {
  const answer = button.querySelector("span:last-child").textContent;
  const quiz = db.getQuiz();
  const questions = quiz.results;
  const questionIndex = quiz.current_question;
  const question = questions[questionIndex];
  const correctAnswer = question.correct_answer;
  if (answer === correctAnswer) {
    // increment score in db
    db.incrementScore();

    // increment score in view
    const score = document.querySelector(".score");
    score.querySelector(".score__amount").textContent =
      db.getQuiz().score + " / " + quiz.results.length;

    // push to correct answers in db
    db.setAnswers({
      correct: [...quiz.answers.correct, questionIndex],
      incorrect: [...quiz.answers.incorrect],
    });

    // button.classList.add("correct");
  } else {
    db.setAnswers({
      correct: [...quiz.answers.correct],
      incorrect: [...quiz.answers.incorrect, questionIndex],
    });
  }
  // disable buttons and set their class
  setAnswerButtonsClass(correctAnswer);
  enableContinueButton();
}

export function setAnswerButtonsClass(correctAnswer) {
  console.log("go");
  console.log(correctAnswer);
  const buttons = document.querySelectorAll(".answer-button");
  console.log(buttons);
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.querySelector("span:last-child").textContent === correctAnswer) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });
}

export function listenToAnswers() {
  const answerButton = document.querySelectorAll(".answer-button");
  answerButton.forEach((button) => {
    button.addEventListener("click", () => handleAnswer(button));
  });
}

export function enableContinueButton() {
  const continueButton = document.querySelector(".continue-button");
  continueButton.disabled = false;
}
