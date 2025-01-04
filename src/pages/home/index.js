import { api } from "../../utils/api";

function html(categories) {
  return `
  <div>Home</div>
  ${CategoriesList(categories)}
  `;
}

function CategoriesList(categories) {
  if (!categories) return "";
  return `
  <ul>
    ${categories.map((category) => `<li>${category.name}</li>`).join("")}
  </ul>
  `;
}

function eventListeners() {}

export async function Page() {
  const categories = await api.categories();
  return {
    html: html(categories.trivia_categories),
    addEventListeners: eventListeners,
  };
}

export function Loading() {
  return html();
}
