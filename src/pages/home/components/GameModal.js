import ToasterErrorMessage from "../../../components/ToasterErrorMessage";
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

const errorMesageTextcontent = (amount) => {
  return `Max: ${amount} questions for this category and difficulty`;
};

export function handleFormChange() {
  const maxAmount = 50;
  const gameModal = document.querySelector(".game-modal");
  const amountInput = gameModal.querySelector("input[name='amount']");
  const categoriesSelect = gameModal.querySelector("select[name='category']");
  const errorMessage = gameModal.querySelector(".error-message");
  const difficultySelect = gameModal.querySelector("select[name='difficulty']");
  const inputs = [amountInput, categoriesSelect, difficultySelect];
  let maximum = maxAmount;
  inputs.forEach((input) => {
    input.addEventListener("change", async (e) => {
      if (categoriesSelect.value !== "") {
        const allQuestionCount = await api.categoryMaxQuestions(
          categoriesSelect.value
        );
        switch (difficultySelect.value) {
          case "easy":
            maximum = Math.min(
              allQuestionCount.total_easy_question_count,
              maxAmount
            );
            amountInput.max = maximum;
            errorMessage.textContent = errorMesageTextcontent(maximum);
            break;
          case "medium":
            maximum = Math.min(
              allQuestionCount.total_medium_question_count,
              maxAmount
            );
            amountInput.max = maximum;
            errorMessage.textContent = errorMesageTextcontent(maximum);
            break;
          case "hard":
            maximum = Math.min(
              allQuestionCount.total_hard_question_count,
              maxAmount
            );
            amountInput.max = maximum;
            errorMessage.textContent = errorMesageTextcontent(maximum);
            break;
          default:
            maximum = Math.min(
              allQuestionCount.total_question_count,
              maxAmount
            );
            amountInput.max = maximum;
            errorMessage.textContent = errorMesageTextcontent(maximum);
        }
      } else {
        amountInput.max = maxAmount;
      }
    });
  });
}

export function handleCancel() {
  const gameModal = document.querySelector(".game-modal");
  const cancelButton = gameModal.querySelector("button[type='reset']");
  cancelButton.addEventListener("click", () => {
    console.log("click cancel");
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
      const amount = form.amount.value;
      const category = form.category.value;
      const difficulty = form.difficulty.value;
      const quiz = await api.quiz({ amount, category, difficulty });
      if (quiz.response_code !== 0) {
        gameModal.close();
        const toasterError = document.createElement("div");
        toasterError.className = "toaster-error-message";
        toasterError.textContent = `Something went wrong... Error: ${quiz.response_code}`;
        document.body.appendChild(toasterError);
        setTimeout(() => {
          const errorMessage = document.querySelector(".toaster-error-message");
          errorMessage.remove();
        }, 3000);
        return;
      } else {
        db.setQuiz(quiz);
        window.location.href = "/quiz";
      }
    } else {
      // invalid form
    }
  });
}
