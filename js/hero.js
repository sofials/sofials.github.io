/* Hero: prato liminale al tramonto pastello, con finestra fluttuante e orb. */
import * as THREE from "./vendor/three.module.min.js";

const canvas = document.getElementById("hero-canvas");
const hero = document.querySelector(".hero");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = matchMedia("(max-width: 760px)").matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
} catch (e) {
  hero.classList.add("no-webgl");
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.6));

const FOG = new THREE.Color("#f6d9e6");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(FOG, 8, 46);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
camera.position.set(0, 1.55, 8);

/* ---- cielo ---- */
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(120, 32, 16),
  new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `
      varying vec3 vP; uniform float uTime;
      void main(){
        float h = vP.y;
        vec3 top = vec3(0.62,0.66,0.98);
        vec3 mid = vec3(0.86,0.78,0.98);
        vec3 hor = vec3(0.965,0.85,0.90);
        vec3 c = mix(hor, mid, smoothstep(0.0, 0.25, h));
        c = mix(c, top, smoothstep(0.25, 0.85, h));
        // sole morbido
        vec3 sd = normalize(vec3(-0.28, 0.07, -1.0));
        float s = max(dot(vP, sd), 0.0);
        c += vec3(1.0,0.93,0.88) * smoothstep(0.9985, 0.9995, s) * 0.8 + vec3(1.0,0.82,0.88) * pow(s, 24.0) * 0.35;
        // nuvole a bande lente
        float n = sin(vP.x*9. + uTime*0.03) * sin(vP.z*7. - uTime*0.02) * 0.5 + 0.5;
        c = mix(c, vec3(1.0), smoothstep(0.62, 0.95, n) * smoothstep(0.05, 0.3, h) * (1.0 - smoothstep(0.3, 0.6, h)) * 0.35);
        gl_FragColor = vec4(c, 1.0);
      }`
  })
);
scene.add(sky);

/* ---- terreno ---- */
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshBasicMaterial({ color: "#78b386" })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

/* ---- erba instanziata ---- */
const COUNT = reduced ? 12000 : (mobile ? 20000 : 42000);
const blade = new THREE.PlaneGeometry(0.08, 1, 1, 4);
blade.translate(0, 0.5, 0);
const geo = new THREE.InstancedBufferGeometry();
geo.index = blade.index;
geo.attributes.position = blade.attributes.position;
geo.attributes.uv = blade.attributes.uv;
const off = new Float32Array(COUNT * 3), sc = new Float32Array(COUNT), ang = new Float32Array(COUNT), tint = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const r = Math.sqrt(Math.random()) * 34;
  const a = Math.random() * Math.PI * 2;
  let x = Math.cos(a) * r, z = Math.sin(a) * r - 6;
  // sentiero libero davanti alla camera
  if (Math.abs(x) < 0.32 + (z + 12) * 0.012 && z > -14 && z < 9 && Math.random() < 0.85) x += Math.sign(x || 1) * 0.45;
  off[i * 3] = x; off[i * 3 + 1] = 0; off[i * 3 + 2] = z;
  sc[i] = 0.35 + Math.random() * 0.55;
  ang[i] = Math.random() * Math.PI;
  tint[i] = Math.random();
}
geo.setAttribute("offset", new THREE.InstancedBufferAttribute(off, 3));
geo.setAttribute("scale", new THREE.InstancedBufferAttribute(sc, 1));
geo.setAttribute("angle", new THREE.InstancedBufferAttribute(ang, 1));
geo.setAttribute("tint", new THREE.InstancedBufferAttribute(tint, 1));
geo.instanceCount = COUNT;

const grassMat = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uFog: { value: FOG }, uNear: { value: 8 }, uFar: { value: 46 }
  },
  vertexShader: `
    attribute vec3 offset; attribute float scale; attribute float angle; attribute float tint;
    uniform float uTime; uniform vec2 uMouse;
    varying float vH; varying float vD; varying float vT;
    void main(){
      vec3 p = position;
      float h = p.y;
      p.x *= (1.0 - h * 0.9);
      p.y *= scale;
      float c = cos(angle), s = sin(angle);
      p = vec3(p.x * c, p.y, p.x * s);
      float w = sin(uTime * 1.1 + offset.x * 0.35 + offset.z * 0.22) * 0.22
              + sin(uTime * 2.3 + offset.x * 1.7) * 0.05 + uMouse.x * 0.15;
      p.x += w * h * h;
      p.z += (w * 0.4 + uMouse.y * 0.08) * h * h;
      vec4 mv = viewMatrix * vec4(p + offset, 1.0);
      vH = h; vD = -mv.z; vT = tint;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform vec3 uFog; uniform float uNear; uniform float uFar;
    varying float vH; varying float vD; varying float vT;
    void main(){
      vec3 base = vec3(0.30, 0.55, 0.38);
      vec3 tip = mix(vec3(0.78, 0.95, 0.74), vec3(0.95, 0.86, 0.95), vT * 0.5);
      vec3 col = mix(base, tip, vH);
      float f = smoothstep(uNear, uFar, vD);
      gl_FragColor = vec4(mix(col, uFog, f), 1.0);
    }`
});
const grass = new THREE.Mesh(geo, grassMat);
grass.frustumCulled = false;
scene.add(grass);

/* ---- finestra fluttuante (nod al desktop OS) ---- */
const win = new THREE.Group();
const frameMat = new THREE.LineBasicMaterial({ color: "#6f5fd8", transparent: true, opacity: 0.85 });
const W = 1.6, H = 1.1;
const rect = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-W/2, -H/2, 0), new THREE.Vector3(W/2, -H/2, 0),
  new THREE.Vector3(W/2, H/2, 0), new THREE.Vector3(-W/2, H/2, 0), new THREE.Vector3(-W/2, -H/2, 0)
]);
win.add(new THREE.Line(rect, frameMat));
const bar = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-W/2, H/2 - 0.16, 0), new THREE.Vector3(W/2, H/2 - 0.16, 0)]);
win.add(new THREE.Line(bar, frameMat));
const glass = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ color: "#ffd9ec", transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide }));
win.add(glass);
win.position.set(2.2, 2.4, -4);
win.rotation.y = -0.35;
scene.add(win);

/* ---- orb ---- */
const orbs = [];
const orbCols = ["#ffffff", "#ffd1e8", "#d6ccff", "#c9f2e7"];
for (let i = 0; i < 5; i++) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(0.08 + Math.random() * 0.12, 24, 16),
    new THREE.MeshBasicMaterial({ color: orbCols[i % orbCols.length], transparent: true, opacity: 0.9 })
  );
  m.position.set((Math.random() - 0.5) * 9, 1.2 + Math.random() * 2.4, -2 - Math.random() * 10);
  m.userData.p = Math.random() * 10;
  scene.add(m); orbs.push(m);
}

/* ---- pollini ---- */
const PN = mobile ? 250 : 600;
const pp = new Float32Array(PN * 3);
for (let i = 0; i < PN; i++) {
  pp[i*3] = (Math.random() - 0.5) * 30;
  pp[i*3+1] = Math.random() * 5;
  pp[i*3+2] = -Math.random() * 30 + 6;
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
const pollen = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: "#ffffff", size: 0.035, transparent: true, opacity: 0.8, depthWrite: false }));
scene.add(pollen);

/* ---- resize / input ---- */
function resize() {
  const w = hero.clientWidth, h = hero.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  win.position.x = camera.aspect < 1 ? 0.8 : 2.2;
}
addEventListener("resize", resize);
resize();

const mouse = new THREE.Vector2(0, 0), target = new THREE.Vector2(0, 0);
addEventListener("pointermove", e => {
  target.set(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1);
});

let visible = true;
new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);

const clock = new THREE.Clock();
function frame() {
  const t = clock.getElapsedTime();
  mouse.lerp(target, 0.04);
  grassMat.uniforms.uTime.value = t;
  grassMat.uniforms.uMouse.value.copy(mouse);
  sky.material.uniforms.uTime.value = t;
  camera.position.x = mouse.x * 0.6;
  camera.position.y = 1.55 - mouse.y * 0.2 + Math.sin(t * 0.4) * 0.03;
  camera.lookAt(0, 1.6, -6);
  win.position.y = 2.3 + Math.sin(t * 0.6) * 0.12;
  win.rotation.y = -0.35 + Math.sin(t * 0.25) * 0.08;
  orbs.forEach(o => { o.position.y += Math.sin(t * 0.7 + o.userData.p) * 0.0025; });
  const a = pGeo.attributes.position.array;
  for (let i = 0; i < PN; i++) {
    a[i*3+1] += 0.002 + Math.sin(t + i) * 0.0008;
    a[i*3] += Math.sin(t * 0.3 + i * 0.1) * 0.002;
    if (a[i*3+1] > 5) a[i*3+1] = 0;
  }
  pGeo.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

hero.classList.add("ready");
if (reduced) {
  frame();
} else {
  renderer.setAnimationLoop(() => { if (visible) frame(); });
}
