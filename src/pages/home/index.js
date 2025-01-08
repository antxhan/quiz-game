import "./index.css";
import { api } from "../../utils/api";
import { Categories } from "./components/Categories";
import {
  GameModal,
  handleCancel,
  handleFormChange,
  handleSubmit,
} from "./components/GameModal";
import { Option } from "./components/Select";

function html(categories) {
  return `
  <header>
    <div class="wrapper">
      <h1>Quiz Game</h1>
      <p>Welcome to the Quiz Game! <br>
      Pick a category and start playing.</p>
    </div>
  </header>
  <main>
    <div class="wrapper">
      ${Categories(categories)}
    </div>
  </main>
  <footer>
    <div class="wrapper">
      <p>Made by <a href="http://antonhansson.net" target="_blank">Anton Hansson</a> using the <a href="https://opentdb.com" target="_blank">Open Trivia Database</a></p>
      <p>Source code available on <a href="https://github.com/antxhan/quiz-game" target="_blank">GitHub</a></p>
    </div>
  </footer>
  ${GameModal()}
  `;
}

async function populateSelect(select, options, selectedId = null) {
  const selectOptions = options
    .map((option) => {
      if (selectedId === option.id) {
        return Option({
          value: option.id,
          label: option.name,
          selected: true,
        });
      } else {
        return Option({ value: option.id, label: option.name });
      }
    })
    .join("");
  select.innerHTML = selectOptions;
}

async function initializeGameModal() {
  const gameModal = document.querySelector(".game-modal");
  // add categories to the game modal
  let categoriesOptions = await api.categories();
  categoriesOptions = categoriesOptions.trivia_categories;
  categoriesOptions.unshift({ id: "", name: "All" });
  const categoriesSelect = gameModal.querySelector("select[name='category']");
  populateSelect(categoriesSelect, categoriesOptions, "");

  // add difficulty to the game modal
  const difficultySelect = gameModal.querySelector("select[name='difficulty']");
  const difficultyOptions = [
    { id: "", name: "Any" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];
  populateSelect(difficultySelect, difficultyOptions, "");
}

function handleCategoryClick() {
  const categoryButtons = document.querySelectorAll(".category-button");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.categoryId;
      console.log(id);

      // get category max questions
      await api.categoryMaxQuestions(id);

      // open game modal
      const gameModal = document.querySelector(".game-modal");
      gameModal.showModal();
      await initializeGameModal();

      // set clicked category as selected
      const categoriesSelect = gameModal.querySelector(
        "select[name='category']"
      );
      categoriesSelect.value = id;
    });
  });
}

export async function Page() {
  const categories = (await api.categories()) || [];
  categories.trivia_categories.push({ id: "", name: "All" });
  return {
    html: html(categories.trivia_categories),
    addEventListeners: () => {
      handleCancel();
      handleCategoryClick();
      handleFormChange();
      handleSubmit();
    },
  };
}

export function Loading() {
  return html();
}
