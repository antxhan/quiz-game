import "./index.css";
import { db } from "../../utils/db";
import { handleClose, QuizView } from "./views/Quiz";
import { ResultsView } from "./views/Results";
import { ContinueButton, handleContinue } from "./components/ContinueButton";
import {
  disableSkipButton,
  handleSkip,
  SkipButton,
} from "./components/SkipButton";
import {
  enableContinueButton,
  listenToAnswers,
  setAnswerButtonsClass,
} from "./components/Answer";

function html(quiz) {
  const questions = quiz.results;
  const currentQuestion = questions[quiz.current_question];
  const progress = (quiz.current_question / questions.length) * 100;
  const score = quiz.score;
  return `
  <div class="wrapper" id="quiz">
  ${
    quiz.current_question < questions.length
      ? QuizView(currentQuestion, progress, score, questions.length)
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
  if (!quiz) window.location.href = "/";

  const isAnswered =
    quiz.answers.correct.includes(quiz.current_question) ||
    quiz.answers.incorrect.includes(quiz.current_question);

  const isGameOver = quiz.current_question >= quiz.results.length;

  return {
    html: html(quiz),
    addEventListeners: () => {
      (!isGameOver && handleClose()) || null;
      handleContinue();
      handleSkip(quiz);
      if (isAnswered) {
        setAnswerButtonsClass(
          quiz.results[quiz.current_question].correct_answer
        );
      }
      (!isAnswered && listenToAnswers()) || null;
      (isAnswered && enableContinueButton()) || null;
      (isGameOver && enableContinueButton()) || null;
      (isAnswered && disableSkipButton()) || null;
      (isGameOver && removeSkipButton()) || null;
      (isGameOver && setDisplayFlex()) || null;
    },
  };
}

function setDisplayFlex() {
  document.querySelector("#quiz").style.display = "flex";
}

function removeSkipButton() {
  const skipButton = document.querySelector(".skip-button");
  document.querySelector(".skip-button").parentNode.style.justifyContent =
    "end";
  skipButton.remove();
}

export function Loading() {
  return `
  LOADING SCREEN 
  `;
}
