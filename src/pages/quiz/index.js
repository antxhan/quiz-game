import "./index.css";
import { api } from "../../utils/api";
import { shuffle } from "../../utils/utils";
import xIcon from "../../assets/icons/x.svg";
import { Question } from "./components/Question";
import { ProgressBar } from "./components/ProgressBar";
import { Score } from "./components/Score";
import { db } from "../../utils/db";

function html(quiz = null) {
  const questions = quiz ? quiz.results : [];
  const currentQuestionIndex = quiz ? quiz.current_question : 0;
  return `
  <div class="wrapper">
    <header>
        <div class="wrapper">
            <button class="close-button">
                <img src="${xIcon}" alt="Close" />
            </button>
            ${ProgressBar(10)}
            ${Score()}
        </div>
    </header>
    <main>
    ${quiz ? Question(questions[currentQuestionIndex]) : ""}  
    </main>
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
