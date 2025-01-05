import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";
import { Score } from "../components/Score";
import xIcon from "../../../assets/icons/x.svg";

export function QuizView(question, progress) {
  return `
  <header>
    <div class="wrapper">
      <button class="close-button">
          <img src="${xIcon}" alt="Close" />
      </button>
      ${ProgressBar(progress)}
      ${Score()}
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
