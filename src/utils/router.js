function router() {
  let path = window.location.pathname.split("/")[1];
  if (path === "") path = "home";
  loadPage(path);
}

function loadPage(page) {
  const app = document.querySelector("body");
  import(`../pages/${page}`)
    .then(async (module) => {
      if (module.Loading) app.innerHTML = module.Loading();
      const { html, addEventListeners } = await module.Page();
      app.innerHTML = html;
      addEventListeners();
    })
    .catch((err) => {
      console.log(err);
      import("../pages/404").then((module) => {
        app.innerHTML = module.default();
      });
    });
}

window.addEventListener("popstate", router);
document.addEventListener("DOMmoduleLoaded", () => {
  router();
});
router();
