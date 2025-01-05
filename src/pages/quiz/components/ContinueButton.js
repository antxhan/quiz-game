import { db } from "../../../utils/db";

export function ContinueButton(currentQuestionIndex, questionsLength) {
  return `
    <button class="continue-button">${
      currentQuestionIndex < questionsLength - 1
        ? "Continue"
        : currentQuestionIndex < questionsLength
        ? "Results"
        : "New Quiz"
    }</button>
    `;
}

export function handleContinue(quiz) {
  const continueButton = document.querySelector(".continue-button");
  continueButton.addEventListener("click", () => {
    if (quiz.current_question < quiz.results.length) {
      quiz.current_question++;
      db.setQuiz(quiz);
    }
    window.location.href = "/quiz";
    if (quiz.current_question === quiz.results.length) {
      window.location.href = "/new-quiz";
    }
  });
}
