import "./index.css";
import { api } from "../../utils/api";
import { db } from "../../utils/db";
import { QuizView } from "./views/Quiz";
import { ResultsView } from "./views/Results";

function html(quiz = null) {
  const questions = quiz ? quiz.results : [];
  return `
  <div class="wrapper">
  ${
    quiz && quiz.current_question < questions.length
      ? QuizView(quiz)
      : ResultsView(quiz)
  }
  </div>
  <footer>
    <div class="wrapper">
        <button class="skip-button">Skip</button>
        <button class="continue-button">Continue</button>
    </div>
  </footer>
  `;
}

function handleContinue() {
  const continueButton = document.querySelector(".continue-button");
  continueButton.addEventListener("click", () => {
    const quiz = db.getQuiz();
    if (quiz.current_question >= quiz.results.length - 1) {
      // game is over
      // show score
      // show results
      // new quiz button
      // go home button
    }
    quiz.current_question++;
    db.setQuiz(quiz);
    window.location.href = "/quiz";
  });
}

export async function Page() {
  const quiz = db.getQuiz();
  if (!quiz) window.location.href = "/";
  return {
    html: html(quiz),
    addEventListeners: () => {
      handleContinue();
    },
  };
}

export function Loading() {
  return html();
}
