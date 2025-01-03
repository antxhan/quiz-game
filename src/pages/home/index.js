function html(data = null) {
  return `<div>${data ? "Home" : "Loading"}</div>`;
}

function eventListeners() {}

export async function Page() {
  // mock async await
  const response = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("responose");
    }, 2000);
  });
  const data = await response;
  return { html: html(data), addEventListeners: eventListeners };
}

export function Loading() {
  return html();
}
