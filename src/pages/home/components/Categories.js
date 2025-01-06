import { categoryIcons } from "../../../assets/icons/categoryIcons";

export function Categories(categories) {
  if (!categories) return "";
  return `
  <ul class="category-list">
    ${categories.map((category) => Category(category)).join("")}
  </ul>
  `;
}

function Category({ id, name }) {
  if (name.includes(":")) {
    name = name.split(":")[1];
  }
  return `
    <li>
      <button class="category-button" data-category-id="${id}">
        <span class="category-icon">${categoryIcons[id]}</span>
        <span class="category-name">${name}</span>
      </button>
    </li>
  `;
}
