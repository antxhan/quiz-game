import "./index.css";
import { api } from "../../utils/api";
import { shuffle } from "../../utils/utils";
import xIcon from "../../assets/icons/x.svg";

function ProgressBar(progress = 0) {
  return `
  <div class="progress-bar">
    <div class="progress-bar__progress" style="width: ${progress}%"></div>
  </div>
  `;
}

function Score(amount, correct, incorrect) {
  return `
    <div>Score</div>
    `;
}

function Question({ question, correct_answer, incorrect_answers }) {
  const answers = shuffle([correct_answer, ...incorrect_answers]);
  return `
  <div class="question-container">
    <p>${question}</p>
    <div class="answers-container">
      ${answers.map((answer, index) => Answer(index, answer)).join("")}
    </div>
  </div>
  `;
}

function Answer(index, answer) {
  return `
    <button class="answer-button">
        <span>${index + 1}.</span>
        <span>${answer}</span>
    </button>
    `;
}

function html(quiz = null) {
  const questions = quiz ? quiz.results : [];
  return `
  <div class="progress-bar-container">
    <button class="close-button">
        <img src="${xIcon}" alt="Close" />
    </button>
    ${ProgressBar(10)}
    ${Score()}
  </div>
  <div class="questions-container">
    ${questions
      .splice(0, 1) // remove this
      .map((question) => Question(question))
      .join("")}
  </div>
  <div class="quiz-footer">
        <button class="skip-button">Skip</button>
        <button class="continue-button">Continue</button>
  </div>
  `;
}

function eventListeners() {}

export async function Page() {
  const quiz = await api.quiz();
  console.log(quiz.results[0]);
  return {
    html: html(quiz),
    addEventListeners: eventListeners,
  };
}

export function Loading() {
  return html();
}
