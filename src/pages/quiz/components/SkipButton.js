import { db } from "../../../utils/db";
import { ResultsView } from "../views/Results";
import { listenToAnswers } from "./Answer";
import { Question } from "./Question";

export function SkipButton(currentQuestionIndex, questionsLength) {
  return `
    <button class="skip-button">${
      currentQuestionIndex < questionsLength ? "Skip" : "Home"
    }</button>
    `;
}

export function handleSkip(quiz) {
  const view = document.querySelector("#quiz");
  const skipButton = document.querySelector(".skip-button");
  skipButton.addEventListener("click", () => {
    db.incrementQuestionIndex();
    let quiz = db.getQuiz();
    if (quiz.current_question <= quiz.results.length - 1) {
      const question = quiz.results[quiz.current_question];
      const progress = (quiz.current_question / quiz.results.length) * 100;
      view.querySelector(".question-container").innerHTML = Question(question);
      listenToAnswers();
      view.querySelector(".progress-bar .progress-bar__progress").style.width =
        progress + "%";
      if (quiz.current_question === quiz.results.length - 1) {
        document.querySelector(".continue-button").textContent = "Results";
      }

      // push question to incorrect answers in db
      db.setAnswers({
        correct: [...quiz.answers.correct],
        incorrect: [...quiz.answers.incorrect, quiz.current_question],
      });
    } else if (quiz.current_question === quiz.results.length) {
      view.innerHTML = ResultsView(quiz);
      skipButton.textContent = "Home";
      document.querySelector(".continue-button").textContent = "New Quiz";
    } else {
      window.location.href = "/";
    }
  });
}

export function disableSkipButton() {
  const skipButton = document.querySelector(".skip-button");
  skipButton.disabled = true;
}
