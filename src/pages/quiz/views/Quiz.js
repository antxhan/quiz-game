import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";
import { Score } from "../components/Score";
import { xIcon } from "../../../assets/icons/x.js";

export function QuizView(question, progress, score, questionsLength) {
  return `
  <header>
    <div class="wrapper">
      <button class="close-button">
        ${xIcon}
      </button>
      ${ProgressBar(progress)}
      ${Score(questionsLength, score)}
    </div>
  </header>
  <main>
    ${Question(question)}
  </main>
 `;
}

export function handleClose() {
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    window.location.href = "/";
  });
}
