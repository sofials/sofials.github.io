/* Pagina progetto: project.html?id=<id> */
(function () {
  const id = new URLSearchParams(location.search).get("id");

  function media(p) {
    let out = "";
    if (p.video) {
      if (/youtube|vimeo/.test(p.video)) {
        out += `<div class="video"><iframe src="${esc(p.video)}" title="${esc(p.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
      } else {
        out += `<div class="video"><video src="${esc(p.video)}" controls playsinline muted loop></video></div>`;
      }
    }
    if (p.gallery && p.gallery.length) {
      out += `<h2 class="mono sec-label">${esc(t("p.gallery"))}</h2><div class="gallery">` +
        p.gallery.map(g => `<figure><img src="${esc(g)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></figure>`).join("") +
        `</div>`;
    }
    return out;
  }

  function hood(H) {
    if (!H) return "";
    const steps = (H.steps || []).map((s, i) => `
      <li class="step"><span class="mono step-n">0${i + 1}</span><div><h4>${esc(s.t)}</h4><p>${esc(s.d)}</p></div></li>`).join("");
    const bullets = H.bullets ? `<ul class="list">${H.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
    const table = H.table ? `
      <div class="table-wrap"><p class="mono table-cap">${esc(H.table.caption)}</p>
      <table><thead><tr>${H.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${H.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "";
    const lesson = H.lesson ? `<div class="lesson"><p class="mono">${esc(t("p.lesson"))}</p><p>${esc(H.lesson)}</p></div>` : "";
    return `
      <details class="hood win">
        <summary class="win-bar"><span class="mono">${esc(t("p.hood"))}</span><span class="hood-hint">${esc(t("p.hoodHint"))}</span><b class="hood-plus">+</b></summary>
        <div class="hood-body">
          <p class="hood-intro">${esc(H.intro || "")}</p>
          <ol class="steps">${steps}</ol>
          ${bullets}${table}${lesson}
        </div>
      </details>`;
  }

  function render() {
    const root = document.getElementById("project");
    const list = PROJECTS;
    const i = list.findIndex(p => p.id === id);
    if (i < 0) { root.innerHTML = `<section class="section"><p>${esc(t("p.notfound"))}</p><a href="index.html">${esc(t("p.back"))}</a></section>`; return; }
    const p = list[i], L = p[LANG];
    const next = list[(i + 1) % list.length];
    document.title = `${p.title} — Sofia Lo Sardo`;
    const tags = p.tags.map(k => `<span class="tag">${esc(TAGS[k][LANG])}</span>`).join("");
    const links = (p.links || []).map(l => `<a class="pill" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label[LANG])} ↗</a>`).join("");

    root.innerHTML = `
      <article class="p">
        <a class="mono back" href="index.html#${p.lab ? "lab" : "work"}">${esc(t("p.back"))}</a>
        <header class="p-head">
          <p class="mono p-file">${esc(p.file)}</p>
          <h1>${esc(p.title)}</h1>
          <p class="p-tagline">${esc(L.tagline)}</p>
          <div class="tags">${tags}</div>
        </header>
        ${coverImg(p, "p-cover")}
        <dl class="meta">
          <div><dt class="mono">${esc(t("p.context"))}</dt><dd>${esc(L.context)}</dd></div>
          <div><dt class="mono">${esc(t("p.role"))}</dt><dd>${esc(L.role)}</dd></div>
          <div><dt class="mono">${esc(t("p.year"))}</dt><dd>${esc(p.year)}</dd></div>
          <div><dt class="mono">${esc(t("p.stack"))}</dt><dd>${p.stack.map(esc).join(" · ")}</dd></div>
        </dl>
        <div class="p-cols">
          <section>
            <h2 class="mono sec-label">${esc(t("p.concept"))}</h2>
            ${L.concept.map(c => `<p class="lead">${esc(c)}</p>`).join("")}
          </section>
          <section>
            <h2 class="mono sec-label">${esc(t("p.did"))}</h2>
            <ul class="list">${L.did.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
            ${links ? `<div class="p-links">${links}</div>` : ""}
          </section>
        </div>
        ${media(p)}
        ${hood(L.hood)}
        <a class="next win" href="project.html?id=${encodeURIComponent(next.id)}">
          <div class="win-bar"><span class="mono">${esc(t("p.next"))} → ${esc(next.file)}</span><i></i><i></i><i></i></div>
          <div class="next-body"><h3>${esc(next.title)}</h3><p>${esc(next[LANG].tagline)}</p></div>
        </a>
      </article>`;
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("langchange", render);
})();
