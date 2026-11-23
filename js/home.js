/* Home: griglia progetti con filtri + Lab */
(function () {
  let active = "all";

  function card(p) {
    const L = p[LANG];
    const tags = p.tags.map(k => `<span class="tag">${esc(TAGS[k][LANG])}</span>`).join("");
    return `
      <a class="card win ${p.featured ? "featured" : ""}" href="project.html?id=${encodeURIComponent(p.id)}" data-tags="${p.tags.join(" ")}">
        <div class="win-bar"><span class="mono">${esc(p.file)}</span><i></i><i></i><i></i></div>
        ${coverImg(p, "card-cover")}
        <div class="card-body">
          <div class="card-top"><h3>${esc(p.title)}</h3><span class="mono year">${esc(p.year)}</span></div>
          <p>${esc(L.tagline)}</p>
          <div class="tags">${tags}</div>
        </div>
      </a>`;
  }

  function renderFilters() {
    const used = new Set();
    PROJECTS.filter(p => !p.lab).forEach(p => p.tags.forEach(t => used.add(t)));
    const keys = Object.keys(TAGS).filter(k => used.has(k));
    document.getElementById("filters").innerHTML =
      [`<button class="chip" data-f="all" aria-pressed="${active === "all"}">${esc(t("filter.all"))}</button>`]
        .concat(keys.map(k => `<button class="chip" data-f="${k}" aria-pressed="${active === k}">${esc(TAGS[k][LANG])}</button>`))
        .join("");
    document.querySelectorAll("#filters .chip").forEach(b => b.addEventListener("click", () => {
      active = b.dataset.f;
      renderFilters();
      applyFilter();
    }));
  }

  function applyFilter() {
    document.getElementById("grid").classList.toggle("filtered", active !== "all");
    document.querySelectorAll("#grid .card").forEach(c => {
      const show = active === "all" || c.dataset.tags.split(" ").includes(active);
      c.classList.toggle("hidden", !show);
    });
  }

  function renderGrid() {
    document.getElementById("grid").innerHTML = PROJECTS.filter(p => !p.lab).map(card).join("");
    applyFilter();
  }

  function renderLab() {
    document.getElementById("lab-list").innerHTML = PROJECTS.filter(p => p.lab).map(p => {
      const L = p[LANG];
      const steps = (L.hood && L.hood.steps || []).map((s, i) => `<li><span class="mono">0${i + 1}</span>${esc(s.t)}</li>`).join("");
      return `
        <a class="lab-item win" href="project.html?id=${encodeURIComponent(p.id)}">
          <div class="win-bar"><span class="mono">${esc(p.file)}</span><i></i><i></i><i></i></div>
          <div class="lab-body">
            ${coverImg(p, "lab-cover")}
            <div class="lab-text">
              <h3>${esc(p.title)}</h3>
              <p class="lab-q">${esc(L.tagline)}</p>
              <ol class="pipeline">${steps}</ol>
              <span class="mono link-arrow">${esc(t("lab.read"))} →</span>
            </div>
          </div>
        </a>`;
    }).join("");
  }

  function render() { renderFilters(); renderGrid(); renderLab(); }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
