/* i18n + helper condivisi */
window.STRINGS = {
  it: {
    "nav.work": "Progetti",
    "nav.lab": "Lab",
    "nav.about": "About",
    "nav.contact": "Contatti",
    "hero.role": "XR & AI developer",
    "hero.line": "XR e intelligenza artificiale, per mondi che rispondono.",
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
    "about.p1": "Sono Sofia, sviluppatrice XR. Studio Ingegneria del Cinema e dei Media Digitali (magistrale) al Politecnico di Torino, laurea prevista nella primavera 2027.",
    "about.p2": "Lavoro tra Unity, VFX Graph, shader, sistemi audio-reattivi, WebAR e computer vision. Mi interessa il punto in cui la percezione (voce, mani, immagini) incontra la parte visiva: far sì che un mondo virtuale ascolti davvero chi lo abita.",
    "about.p3": "Ho partecipato come VR developer alla residenza internazionale AVENUE CoVE (Erasmus+) e ho sviluppato esperienze AR e installazioni interattive per la Fondazione Marazzato.",
    "now.title": "Ora",
    "now.p": "Sto lavorando alla tesi magistrale: un agente su NVIDIA XR AI che guarda una persona montare un oggetto e capisce, mentre lavora, a che passo è e se sta sbagliando. Unisce un grafo della procedura ricavato dal manuale con un modello visione-linguaggio (VLM) che verifica lo stato del montaggio.",
    "now.anim": "Intanto: animazioni dreamcore in Blender, come quelle in apertura.",
    "skills.title": "Strumenti",
    "contact.title": "Scrivimi",
    "contact.p": "Per collaborazioni, opportunità di lavoro o ricerca, o solo per parlare di XR.",
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
    "hero.role": "XR & AI developer",
    "hero.line": "XR and artificial intelligence, for worlds that respond.",
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
    "about.p1": "I'm Sofia, an XR developer. I'm doing my MSc in Cinema and Digital Media Engineering at Politecnico di Torino, graduating in spring 2027.",
    "about.p2": "I work across Unity, VFX Graph, shaders, audio-reactive systems, WebAR and computer vision. What I care about is where perception (voice, hands, images) meets visuals: making a virtual world actually listen to whoever is inside it.",
    "about.p3": "I took part in the AVENUE CoVE international residency (Erasmus+) as a VR developer, and I've built AR experiences and interactive installations for Fondazione Marazzato.",
    "now.title": "Now",
    "now.p": "Working on my master's thesis: an agent on NVIDIA XR AI that watches a person assemble an object and understands, while they work, which step they're on and whether they're making a mistake. It combines a procedure graph built from the manual with a vision-language model (VLM) that checks the state of the assembly.",
    "now.anim": "Meanwhile: dreamcore animations in Blender, like the ones at the top.",
    "skills.title": "Tools",
    "contact.title": "Say hi",
    "contact.p": "For collaborations, job or research opportunities, or just to talk XR.",
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
