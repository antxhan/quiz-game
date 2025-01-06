import "./index.css";
import { api } from "../../utils/api";
import { Categories } from "./components/Categories";
import { GameModal, handleCancel, handleSubmit } from "./components/GameModal";
import { Option } from "./components/Select";

function html(categories) {
  return `
  <header>
    <div class="wrapper">
      <h1>Quiz Game</h1>
    </div>
  </header>
  <main>
    <div class="wrapper">
      <div>Home</div>
      ${Categories(categories)}
      <button class="play-button">Play</button>
    </div>
  </main>
  <footer>
    <div class="wrapper">
      <p>Made by <a href="http://antonhansson.net" target="_blank">Anton Hansson</a> using the <a href="https://opentdb.com" target="_blank">Open Trivia Database</a></p>
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

function handlePlay() {
  const playButton = document.querySelector(".play-button");
  const gameModal = document.querySelector(".game-modal");
  playButton.addEventListener("click", async () => {
    gameModal.showModal();

    // add categories to the game modal
    let categoriesOptions = await api.categories();
    categoriesOptions = categoriesOptions.trivia_categories;
    categoriesOptions.unshift({ id: null, name: "All" });
    console.log(categoriesOptions);
    const categoriesSelect = gameModal.querySelector("select[name='category']");
    populateSelect(categoriesSelect, categoriesOptions, null);

    // add difficulty to the game modal
    const difficultySelect = gameModal.querySelector(
      "select[name='difficulty']"
    );
    const difficultyOptions = [
      { id: null, name: "Any" },
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
    ];
    populateSelect(difficultySelect, difficultyOptions, 0);

    // add type to the game modal
    const typeSelect = gameModal.querySelector("select[name='type']");
    const typeOptions = [
      { id: null, name: "Any" },
      { id: "multiple", name: "Multiple" },
      { id: "boolean", name: "True / False" },
    ];
    populateSelect(typeSelect, typeOptions, 0);
  });
}

export async function Page() {
  const categories = (await api.categories()) || [];
  return {
    html: html(categories.trivia_categories),
    addEventListeners: () => {
      handlePlay();
      handleCancel();
      handleSubmit();
    },
  };
}

export function Loading() {
  return html();
}
