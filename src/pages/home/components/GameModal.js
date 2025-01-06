import { api } from "../../../utils/api";
import { db } from "../../../utils/db";
import NumberInput from "./NumberInput";
import Select from "./Select";

export function GameModal() {
  return `
    <dialog class="game-modal">
        <h2>New Quiz</h2>
        <form action="/quiz">
            ${NumberInput("form__number-input", "Questions", "amount")}
            ${Select("form__select", "Category", "category", [])}
            ${Select("form__select", "Difficulty", "difficulty", [])}
            ${Select("form__select", "Type", "type", [])}
            ${Select("form__select", "Encoding", "encoding", [])}
            <div class="game-modal__buttons">
              <button type="reset">Cancel</button>
              <button type="submit">Play</button>
            </div>
        </form>
    </dialog>
    `;
}

export function handleCancel() {
  const gameModal = document.querySelector(".game-modal");
  const cancelButton = gameModal.querySelector("button[type='reset']");
  cancelButton.addEventListener("click", () => {
    gameModal.close();
  });
}

export function handleSubmit() {
  const gameModal = document.querySelector(".game-modal");
  const playButton = gameModal.querySelector("button[type='submit']");
  playButton.addEventListener("click", async (e) => {
    // e.preventDefault();
    // gameModal.close();
    // TODO: get all inputs values
    const quiz = await api.quiz();
    db.setQuiz(quiz);
    // window.location.href = "/quiz";
  });
}
