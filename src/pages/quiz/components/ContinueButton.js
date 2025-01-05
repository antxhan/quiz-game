import { db } from "../../../utils/db";
import { ResultsView } from "../views/Results";
import { listenToAnswers } from "./Answer";
import { Question } from "./Question";

export function ContinueButton(currentQuestionIndex, questionsLength) {
  const continueButton = document.querySelector(".continue-button");
  if (continueButton) return continueButton;
  return `
    <button class="continue-button" disabled>${
      currentQuestionIndex < questionsLength - 1
        ? "Continue"
        : currentQuestionIndex < questionsLength
        ? "Results"
        : "New Quiz"
    }</button>
    `;
}

export function handleContinue() {
  const view = document.querySelector("#quiz");
  const continueButton = ContinueButton();
  continueButton.addEventListener("click", () => {
    const skipButton = document.querySelector(".skip-button");
    skipButton.disabled = false;
    db.incrementQuestionIndex();
    let quiz = db.getQuiz();
    if (quiz.current_question <= quiz.results.length - 1) {
      continueButton.disabled = true;
      const question = quiz.results[quiz.current_question];
      const progress = (quiz.current_question / quiz.results.length) * 100;
      view.querySelector(".question-container").innerHTML = Question(question);
      listenToAnswers();
      view.querySelector(".progress-bar .progress-bar__progress").style.width =
        progress + "%";
      if (quiz.current_question === quiz.results.length - 1) {
        continueButton.textContent = "Results";
      }
    } else if (quiz.current_question === quiz.results.length) {
      view.innerHTML = ResultsView(quiz);
      continueButton.textContent = "New Quiz";
      document.querySelector(".skip-button").textContent = "Home";
    } else {
      window.location.href = "/new-quiz";
    }
  });
}
