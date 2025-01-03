import { api } from "../../utils/api";

function html(data = null) {
  return `<div>${data ? "Home" : "Loading"}</div>`;
}

function eventListeners() {}

export async function Page() {
  const categories = [];
  //   const categories = await api.categories();
  //   console.log(categories);
  return { html: html({ categories }), addEventListeners: eventListeners };
}

export function Loading() {
  return html();
}
