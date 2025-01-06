import { api } from "../../../utils/api";
import { db } from "../../../utils/db";
import NumberInput from "./NumberInput";
import Select from "./Select";

export function GameModal() {
  return `
    <dialog class="game-modal">
        <h2>New Quiz</h2>
        <form>
            ${NumberInput("form__number-input", "Questions", "amount")}
            ${Select("form__select", "Category", "category", [])}
            ${Select("form__select", "Difficulty", "difficulty", [])}
            ${Select("form__select", "Type", "type", [])}
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
    const form = gameModal.querySelector("form");
    const isValid = form.checkValidity();
    if (isValid) {
      e.preventDefault();
      // TODO: get all inputs values

      const amount = form.amount.value;
      const category = form.category.value;
      const difficulty = form.difficulty.value;
      const type = form.type.value;
      const encoding = form.encoding.value;

      const quiz = await api.quiz();
      db.setQuiz(quiz);
      window.location.href = "/quiz";
    } else {
      // invalid form
    }
    // e.preventDefault();
  });
}
