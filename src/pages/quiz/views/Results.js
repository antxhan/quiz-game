import "./results.css";
import { checkIcon } from "../../../assets/icons/check";
import { xIcon } from "../../../assets/icons/x";

export function ResultsView(quiz) {
  const correct_answers = quiz.answers.correct;
  const score = correct_answers.length;
  const questions = quiz.results;
  const quizElement = document.querySelector("#quiz");
  if (quizElement) {
    quizElement.style.display = "flex";
  }
  return `
    <h1>Results</h1>
    ${Score(questions.length, score)}
    <main>
      ${ResultsList(questions, correct_answers)}
    </main>
    `;
}

function Score(questionsLength, score) {
  return `
    <div>You got ${score} out of ${questionsLength} questions correct!</div>
    `;
}

function ResultsList(questions, correct_answers) {
  return `
  <ol class="results-list">
    ${questions
      .map((question, index) =>
        ResultItem(question, correct_answers.includes(index), index + 1)
      )
      .join("")}
  </ol>
 `;
}

function ResultItem(question, isCorrect, index) {
  return `
    <li class="result-item ${isCorrect ? "correct" : "incorrect"}">
      <span class="result-item__index">${index}</span>
      <div>
        <h2>${question.question}</h2>
        <div>${question.correct_answer}</div>
      </div>
      ${isCorrect ? checkIcon : xIcon}
    </li>
    `;
}
