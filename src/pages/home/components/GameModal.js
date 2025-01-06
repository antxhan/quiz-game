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
            ${/* Select("form__select", "Type", "type", []) */ ""}
            <div class="game-modal__buttons">
              <button type="reset">Cancel</button>
              <button type="submit">Play</button>
            </div>
        </form>
    </dialog>
    `;
}

export function handleFormChange() {
  const maxAmount = 50;
  const gameModal = document.querySelector(".game-modal");
  const amountInput = gameModal.querySelector("input[name='amount']");
  const categoriesSelect = gameModal.querySelector("select[name='category']");
  const difficultySelect = gameModal.querySelector("select[name='difficulty']");
  const inputs = [amountInput, categoriesSelect, difficultySelect];
  inputs.forEach((input) => {
    input.addEventListener("change", async (e) => {
      if (categoriesSelect.value !== "") {
        const allQuestionCount = await api.categoryMaxQuestions(
          categoriesSelect.value
        );
        switch (difficultySelect.value) {
          case "easy":
            amountInput.max = Math.min(
              allQuestionCount.total_easy_question_count,
              maxAmount
            );
            break;
          case "medium":
            amountInput.max = Math.min(
              allQuestionCount.total_medium_question_count,
              maxAmount
            );
            break;
          case "hard":
            amountInput.max = Math.min(
              allQuestionCount.total_hard_question_count,
              maxAmount
            );
            break;
          default:
            amountInput.max = Math.min(
              allQuestionCount.total_question_count,
              maxAmount
            );
        }
      } else {
        amountInput.max = maxAmount;
      }
      console.log(amountInput.max);
    });
  });
}

export function handleCateogryChange() {
  const gameModal = document.querySelector(".game-modal");
  const categorySelect = gameModal.querySelector("select[name='category']");
  const difficultySelect = gameModal.querySelector("select[name='difficulty']");
  categorySelect.addEventListener("change", async (e) => {
    console.log(e.target.value);
    const categoryId = e.target.value;
    if (categoryId !== "") {
      const categoryMaxQuestions = await api.categoryMaxQuestions(categoryId);
      console.log(categoryMaxQuestions);
    } else {
      //
    }
  });
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

      // const amount = form.amount.value;
      // const category = form.category.value;
      // const difficulty = form.difficulty.value;

      const quiz = await api.quiz();
      db.setQuiz(quiz);
      window.location.href = "/quiz";
    } else {
      // invalid form
    }
    // e.preventDefault();
  });
}
