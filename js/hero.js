/* Hero: le animazioni Blender di Sofia in loop, con dissolvenza tra una e l'altra.
   Per cambiare o aggiungere clip modifica HERO_CLIPS (stesso ordine = ordine di riproduzione). */
(function () {
  const HERO_CLIPS = [
    { src: "assets/projects/tempio-infinito/anim.mp4", hd: "assets/projects/tempio-infinito/hero-1080.mp4", poster: "assets/projects/tempio-infinito/cover.webp", name: "tempio_infinito.mp4", id: "tempio-infinito" },
    { src: "assets/projects/sogno-hokusai/anim.mp4", hd: "assets/projects/sogno-hokusai/hero-1080.mp4", poster: "assets/projects/sogno-hokusai/cover.webp", name: "sogno_hokusai.mp4", id: "sogno-hokusai" }
  ];
  const FADE = 1.2; // secondi di dissolvenza
  // versione 1080p sugli schermi grandi, 720p su telefono / connessione lenta
  const conn = navigator.connection || {};
  const useHD = Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1) > 1400 && !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || "");

  const hero = document.querySelector(".hero");
  const vids = [...hero.querySelectorAll(".hero-video")];
  const label = hero.querySelector(".hero-now");
  const soundBtn = hero.querySelector(".hero-sound");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0, cur = 0, muted = true, switching = false;

  function setLabel(clip) {
    label.href = "project.html?id=" + clip.id;
    label.querySelector("span").textContent = clip.name;
  }
  function load(v, clip) {
    v.poster = clip.poster;
    v.src = useHD && clip.hd ? clip.hd : clip.src;
    v.muted = muted;
    v.load();
  }

  load(vids[0], HERO_CLIPS[0]);
  setLabel(HERO_CLIPS[0]);
  vids[0].classList.add("on");
  hero.classList.add("ready");

  if (reduced) { soundBtn.hidden = true; return; }

  vids[0].play().catch(() => {});

  function next() {
    if (switching || HERO_CLIPS.length < 2) return;
    switching = true;
    idx = (idx + 1) % HERO_CLIPS.length;
    const a = vids[cur], b = vids[1 - cur];
    load(b, HERO_CLIPS[idx]);
    b.play().catch(() => {});
    b.classList.add("on");
    a.classList.remove("on");
    setLabel(HERO_CLIPS[idx]);
    setTimeout(() => { a.pause(); cur = 1 - cur; switching = false; }, FADE * 1000);
  }

  vids.forEach(v => {
    v.addEventListener("timeupdate", () => {
      if (v === vids[cur] && v.duration && v.duration - v.currentTime < FADE) next();
    });
    v.addEventListener("ended", () => {
      if (v !== vids[cur]) return;
      if (HERO_CLIPS.length < 2) { v.currentTime = 0; v.play(); } else next();
    });
  });

  soundBtn.addEventListener("click", () => {
    muted = !muted;
    vids.forEach(v => { v.muted = muted; });
    soundBtn.setAttribute("aria-pressed", String(!muted));
    soundBtn.querySelector("span").textContent = muted ? "audio off" : "audio on";
  });

  new IntersectionObserver(([en]) => {
    const v = vids[cur];
    if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
  }).observe(hero);
})();
