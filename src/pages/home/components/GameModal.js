import { api } from "../../../utils/api";
import { db } from "../../../utils/db";

export function GameModal() {
  return `
    <dialog class="game-modal">
        <form>
            <label for="amount">Amount</label>
            <input type="number" id="amount" name="amount" min="1" max="10" value="10" />
            <label for="category">Category</label>
            <select id="category" name="category">
                <option value="0">Select a category</option>
            </select>
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty">
                <option value="0">Select a difficulty</option>
            </select>
            <label for="type">Type</label>
            <select id="type" name="type">
                <option value="0">Select a type</option>
            </select>
            <label for="encoding">Encoding</label>
            <select id="encoding" name="encoding">
                <option value="0">Select an encoding</option>
            </select>
            <button type="reset">Cancel</button>
            <button type="submit">Play</button>
        </form>
    </dialog>
    `;
}

export function handleCancel() {
  const cancelButton = document.querySelector("button[type='reset']");
  cancelButton.addEventListener("click", () => {
    const gameModal = document.querySelector(".game-modal");
    gameModal.close();
  });
}

export function handleSubmit() {
  const playButton = document.querySelector("button[type='submit']");
  playButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const gameModal = document.querySelector(".game-modal");
    gameModal.close();
    // TODO: get all inputs values
    const quiz = await api.quiz();
    db.setQuiz(quiz);
    window.location.href = "/quiz";
  });
}
