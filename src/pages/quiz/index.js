import "./index.css";
import { db } from "../../utils/db";
import { handleClose, QuizView } from "./views/Quiz";
import { ResultsView } from "./views/Results";
import { ContinueButton, handleContinue } from "./components/ContinueButton";
import { handleSkip, SkipButton } from "./components/SkipButton";

function html(quiz) {
  const questions = quiz.results;
  const currentQuestion = questions[quiz.current_question];
  const progress = (quiz.current_question / questions.length) * 100;
  return `
  <div class="wrapper" id="quiz">
  ${
    quiz.current_question < questions.length
      ? QuizView(currentQuestion, progress)
      : ResultsView(quiz)
  }
  </div>
  <footer>
    <div class="wrapper">
        ${SkipButton(quiz.current_question, questions.length)}
        ${ContinueButton(quiz.current_question, questions.length)}
    </div>
  </footer>
  `;
}

export async function Page() {
  const quiz = db.getQuiz();
  if (!quiz || quiz.current_question === quiz.results.length)
    window.location.href = "/";

  const isGameOver = quiz.current_question >= quiz.results.length;
  return {
    html: html(quiz),
    addEventListeners: () => {
      (!isGameOver && handleClose()) || null;
      handleContinue();
      handleSkip(quiz);
    },
  };
}

export function Loading() {
  return `
  LOADING SCREEN 
  `;
}
