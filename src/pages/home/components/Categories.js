export function Categories(categories) {
  if (!categories) return "";
  return `
  <ul>
    ${categories.map((category) => `<li>${category.name}</li>`).join("")}
  </ul>
  `;
}
