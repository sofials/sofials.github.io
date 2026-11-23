/* i18n + helper condivisi */
window.STRINGS = {
  it: {
    "nav.work": "Progetti",
    "nav.lab": "Lab",
    "nav.about": "About",
    "nav.contact": "Contatti",
    "hero.role": "XR developer & creative technologist",
    "hero.line": "Costruisco sistemi che ascoltano voce, mani e immagini, e mondi che rispondono.",
    "hero.cta": "entra",
    "hero.loading": "caricamento del prato…",
    "work.title": "Progetti",
    "work.sub": "Esperienze immersive, sistemi di percezione, installazioni.",
    "filter.all": "Tutti",
    "card.open": "apri",
    "lab.title": "Lab",
    "lab.sub": "Esperimenti per capire come funzionano davvero le cose sotto le librerie.",
    "lab.read": "leggi l'esperimento",
    "about.title": "About",
    "about.p1": "Sono Sofia, sviluppatrice XR. Studio Ingegneria del Cinema e dei Media Digitali (magistrale) al Politecnico di Torino.",
    "about.p2": "Lavoro tra Unity, VFX Graph, shader, sistemi audio-reattivi, WebAR e computer vision. Mi interessa il punto in cui la percezione (voce, mani, immagini) incontra la parte visiva: far sì che un mondo virtuale ascolti davvero chi lo abita.",
    "about.p3": "Ho fatto parte del progetto europeo AVENUE CoVE come VR developer e ho sviluppato installazioni interattive per contesti museali.",
    "now.title": "Ora",
    "now.p": "Sto lavorando alla tesi magistrale su agenti AI in contesti immersivi: sistemi che, oltre a percepire, capiscono e agiscono nello spazio.",
    "now.anim": "Intanto: animazioni dreamcore in Blender, come quelle in apertura.",
    "skills.title": "Strumenti",
    "contact.title": "Scrivimi",
    "contact.p": "Per collaborazioni, tesi, residenze o solo per parlare di XR.",
    "p.back": "← tutti i progetti",
    "p.context": "Contesto",
    "p.role": "Ruolo",
    "p.year": "Anno",
    "p.stack": "Stack",
    "p.concept": "Concept",
    "p.did": "Cosa ho fatto",
    "p.hood": "Under the hood",
    "p.hoodHint": "per chi vuole il dettaglio tecnico",
    "p.lesson": "Cosa ho imparato",
    "p.links": "Link",
    "p.next": "Prossimo",
    "p.gallery": "Galleria",
    "p.notfound": "Progetto non trovato.",
    "footer": "fatto a mano, nel prato"
  },
  en: {
    "nav.work": "Work",
    "nav.lab": "Lab",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.role": "XR developer & creative technologist",
    "hero.line": "I build systems that listen to voices, hands and images, and worlds that respond.",
    "hero.cta": "enter",
    "hero.loading": "growing the grass…",
    "work.title": "Work",
    "work.sub": "Immersive experiences, perception systems, installations.",
    "filter.all": "All",
    "card.open": "open",
    "lab.title": "Lab",
    "lab.sub": "Experiments to understand how things really work underneath the libraries.",
    "lab.read": "read the experiment",
    "about.title": "About",
    "about.p1": "I'm Sofia, an XR developer. I'm doing my MSc in Cinema and Digital Media Engineering at Politecnico di Torino.",
    "about.p2": "I work across Unity, VFX Graph, shaders, audio-reactive systems, WebAR and computer vision. What I care about is where perception (voice, hands, images) meets visuals: making a virtual world actually listen to whoever is inside it.",
    "about.p3": "I was a VR developer in the European project AVENUE CoVE and I've built interactive installations for museums.",
    "now.title": "Now",
    "now.p": "Working on my master's thesis on AI agents in immersive contexts: systems that don't just perceive, but understand and act in space.",
    "now.anim": "Meanwhile: dreamcore animations in Blender, like the ones at the top.",
    "skills.title": "Tools",
    "contact.title": "Say hi",
    "contact.p": "For collaborations, thesis, residencies or just to talk XR.",
    "p.back": "← all projects",
    "p.context": "Context",
    "p.role": "Role",
    "p.year": "Year",
    "p.stack": "Stack",
    "p.concept": "Concept",
    "p.did": "What I did",
    "p.hood": "Under the hood",
    "p.hoodHint": "for the technical deep-dive",
    "p.lesson": "What I learned",
    "p.links": "Links",
    "p.next": "Next",
    "p.gallery": "Gallery",
    "p.notfound": "Project not found.",
    "footer": "handmade, in the meadow"
  }
};

window.getLang = function () {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "it" || q === "en") return q;
  try {
    const s = localStorage.getItem("lang");
    if (s === "it" || s === "en") return s;
  } catch (e) {}
  return (navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en";
};

window.setLang = function (l) {
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.documentElement.lang = l;
  window.LANG = l;
  applyStrings();
  document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
};

window.t = function (k) {
  return (STRINGS[window.LANG] && STRINGS[window.LANG][k]) || k;
};

window.applyStrings = function () {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.setAttribute("aria-pressed", b.dataset.lang === window.LANG ? "true" : "false");
  });
};

window.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
};

/* fallback cover: gradiente pastello generato dal colore accent */
window.coverStyle = function (p) {
  const a = p.accent || "#b79cff";
  return `background-image: radial-gradient(120% 90% at 20% 10%, #fff8 0%, transparent 50%), radial-gradient(90% 80% at 80% 90%, ${a} 0%, transparent 70%), linear-gradient(160deg, #f4efff, ${a}55);`;
};

window.coverImg = function (p, cls) {
  // l'immagine si nasconde da sola se il file non esiste, lasciando il gradiente
  return `<div class="${cls}" style="${coverStyle(p)}">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  window.LANG = getLang();
  document.documentElement.lang = window.LANG;
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
  applyStrings();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
