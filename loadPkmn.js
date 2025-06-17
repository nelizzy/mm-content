const loadPkmn = (devLink, currScript) => {
  fetch(devLink)
    .then((resp) => resp.text())
    .then((html) => handleHtml(html));

  function handleHtml(html) {
    const postContainer = currScript.closest(".postcolor") || currScript.closest(".profiletextbox");
    console.log("running code", postContainer, devLink);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const el = doc.querySelector(".nelizzy-journal");
    el.querySelectorAll(".released").forEach((released) => released.remove());
    el.querySelectorAll(".pokemon").forEach((pkmn) => {
      const xpBar = pkmn.querySelector(".xp");
      xpBar.parentElement.insertAdjacentElement("afterbegin", xpBar);
      const level = xpBar.querySelector("summary").textContent;
      const levelText = level.split("]")[0].split("[")[1];
      // don't do it if there's already a level in there?
      const hasLevel = xpBar.closest(".pokemon").querySelector(".title").textContent.includes("✦");

      hasLevel || xpBar.closest(".pokemon").querySelector(".title small").insertAdjacentText("beforebegin", ` [${levelText}]`);

      pkmn.removeAttribute("open");
    });
    postContainer.querySelector(".insert-here").insertAdjacentElement("afterbegin", el);
    postContainer.querySelectorAll(".insert-here script").forEach((script) => {
      eval(script.textContent);
    });
  }
};
