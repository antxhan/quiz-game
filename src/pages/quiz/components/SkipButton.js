import { db } from "../../../utils/db";

export function SkipButton(currentQuestionIndex, questionsLength) {
  return `
    <button class="skip-button">${
      currentQuestionIndex < questionsLength ? "Skip" : "Home"
    }</button>
    `;
}

export function handleSkip(quiz) {
  const skipButton = document.querySelector(".skip-button");
  skipButton.addEventListener("click", () => {
    if (quiz.current_question < quiz.results.length) {
      quiz.current_question++;
      db.setQuiz(quiz);
      window.location.href = "/quiz";
    } else {
      window.location.href = "/";
    }
  });
}
