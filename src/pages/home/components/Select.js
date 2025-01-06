export default function Select(className, label, name, options) {
  return `
    <div class="${className}">
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}">
            ${options.map((option) => Option(option)).join("")}
        </select>
    </div>
  `;
}

function Option({ value, label }) {
  return `
    <option value="${value}">${label}</option>
    `;
}
