import "./index.css";
import { api } from "../../utils/api";
import { Categories } from "./components/Categories";
import { GameModal, handleCancel, handleSubmit } from "./components/GameModal";

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
      ${GameModal()}
    </div>
  </main>
  <footer>
    <div class="wrapper">
      <p>Made by <a href="http://antonhansson.net" target="_blank">Anton Hansson</a> using the <a href="https://opentdb.com" target="_blank">Open Trivia Database</a></p>
    </div>
  </footer>
  `;
}

function handlePlay() {
  const playButton = document.querySelector(".play-button");
  const gameModal = document.querySelector(".game-modal");
  playButton.addEventListener("click", () => {
    gameModal.showModal();
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
