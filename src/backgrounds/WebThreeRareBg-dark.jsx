// src/components/WebThreeRareBG.jsx
import React, { useRef, useEffect } from "react";
// planetAssets removed (planets & supernovas stripped)

const THREE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";

const DEFAULT_PRIMARY = 0x6fb3ff;
const DEFAULT_SECONDARY = 0x95a9ff;
const DEFAULT_BG = 0x090c13;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = Array.from(document.getElementsByTagName("script")).find(
      (s) => s.src && s.src.indexOf(src) !== -1
    );
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
      existing.addEventListener("load", () => resolve(existing));
      existing.addEventListener("error", (e) => reject(e));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-three-cdn", src);
    s.addEventListener("load", () => {
      s.setAttribute("data-loaded", "true");
      resolve(s);
    });
    s.addEventListener("error", (e) => reject(e));
    document.head.appendChild(s);
  });
}

function extractPaletteFromTexture(tex) {
  try {
    const img = tex.image;
    const cw = Math.min(128, img.width || 128);
    const ch = Math.min(128, img.height || 128);
    const cvs = document.createElement("canvas");
    cvs.width = cw;
    cvs.height = ch;
    const ctx = cvs.getContext("2d");
    ctx.drawImage(img, 0, 0, cw, ch);

    const samplePts = [
      [Math.floor(cw * 0.5), Math.floor(ch * 0.5)],
      [Math.floor(cw * 0.8), Math.floor(ch * 0.25)],
      [Math.floor(cw * 0.2), Math.floor(ch * 0.75)],
      [Math.floor(cw * 0.75), Math.floor(ch * 0.7)],
      [Math.floor(cw * 0.3), Math.floor(ch * 0.3)],
    ];

    const samples = samplePts.map(([x, y]) => {
      const d = ctx.getImageData(x, y, 1, 1).data;
      return { r: d[0], g: d[1], b: d[2], lum: 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2] };
    });

    const center = samples[0];
    let brightest = samples[0];
    let darkest = samples[0];
    for (let s of samples) {
      if (s.lum > brightest.lum) brightest = s;
      if (s.lum < darkest.lum) darkest = s;
    }

    function toThreeColor(s) {
      const c = new window.THREE.Color();
      c.r = s.r / 255;
      c.g = s.g / 255;
      c.b = s.b / 255;
      return c;
    }

    return {
      primary: toThreeColor(center),
      accent: toThreeColor(brightest),
      dark: toThreeColor(darkest),
    };
  } catch (e) {
    return null;
  }
}

export default function WebThreeRareBG(props) {
  const {
    interactive = true,
    className = "",
    style = {},
    primary = DEFAULT_PRIMARY,
    secondary = DEFAULT_SECONDARY,
    bg = DEFAULT_BG,
    particleCount = 700,
    crystalSize = 1.5,
    pixelRatio = 1.5,
    // planetCount removed
    shootingStarRate = 0.006,
    // supernovaRate and supernovaEnabled removed
    starCount = 2800,
    textureUrl = "src/assets/planets/azure-pigment-diffusing-water.jp",
    overlayDarkness = 0.35,
    // crystalSpeed: number or { spin, wobble, wobbleAmp }
    crystalSpeed = { spin: 0.0025, wobble: 0.05, wobbleAmp: 0.035 },
  } = props || {};

  const containerRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      if (!window.THREE) await loadScriptOnce(THREE_CDN);
      if (!mounted) return;
      const THREE = window.THREE;

      const container = containerRef.current;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatio));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(bg, 1.0);

      // Strong CSS safeguards to avoid flashing during DOM/paint updates
      renderer.domElement.style.display = "block";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.backgroundColor = bgColor;
      renderer.domElement.style.pointerEvents = "none";
      renderer.domElement.style.willChange = "transform, opacity";
      container.appendChild(renderer.domElement);

      // dark overlay div for UI readability
      const overlayDiv = document.createElement("div");
      overlayDiv.style.position = "absolute";
      overlayDiv.style.left = "0";
      overlayDiv.style.top = "0";
      overlayDiv.style.width = "100%";
      overlayDiv.style.height = "100%";
      overlayDiv.style.pointerEvents = "none";
      overlayDiv.style.background = `rgba(0,0,0,${Math.max(0, Math.min(1, overlayDarkness))})`;
      overlayDiv.style.zIndex = "1";
      container.appendChild(overlayDiv);

      // Scene & camera
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(bg, 0.0035);
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
      camera.position.set(0, 0, 8.0);

      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x080820, 0.7);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 0.7);
      key.position.set(5, 5, 5);
      scene.add(key);

      // Nebula planes array (declare early so bands can push to it)
      const nebulaPlanes = [];

      // create a small glow texture (used throughout)
      const _glowTexture = (function makeGlowTexture(size = 256) {
        const cvs = document.createElement("canvas");
        cvs.width = size;
        cvs.height = size;
        const ctx = cvs.getContext("2d");
        const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.2, "rgba(255,255,255,0.8)");
        grd.addColorStop(0.45, "rgba(255,255,255,0.25)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(cvs);
        tex.needsUpdate = true;
        return tex;
      })();

      // build background texture if available
      const loader = new THREE.TextureLoader();
      let bgTexture = null;
      try {
        bgTexture = await new Promise((resolve) => {
          loader.load(
            textureUrl,
            (tex) => {
              tex.encoding = THREE.sRGBEncoding;
              resolve(tex);
            },
            undefined,
            (err) => {
              console.warn("Failed to load bg texture:", err);
              resolve(null);
            }
          );
        });
      } catch (e) {
        bgTexture = null;
      }

      // derive palette if possible
      let derived = null;
      if (bgTexture) {
        derived = extractPaletteFromTexture(bgTexture);
        if (derived) {
          derived.primary = derived.primary.clone().lerp(new THREE.Color(0x3b4ff2), 0.12);
        }
      }

      // palette with sensible fallbacks
      const pal = {
        primary: derived ? derived.primary : new THREE.Color(primary),
        accent: derived ? derived.accent : new THREE.Color(secondary),
        dark: derived ? derived.dark : new THREE.Color(bg),
      };

      // SKY sphere (use photographic backdrop if available)
      const skyGeo = new THREE.SphereBufferGeometry(800, 64, 64);
      let skyMat;
      if (bgTexture) {
        const sulfurTint = new THREE.Color(0xffd86b);
        skyMat = new THREE.MeshBasicMaterial({
          map: bgTexture,
          color: sulfurTint.clone().multiplyScalar(0.72),
          side: THREE.BackSide,
          depthWrite: false,
        });
      } else {
        skyMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(bg),
          side: THREE.BackSide,
          depthWrite: false,
        });
      }
      const sky = new THREE.Mesh(skyGeo, skyMat);
      sky.rotation.y = Math.PI;
      sky.renderOrder = -10;
      scene.add(sky);

      // Milky way band (procedural) — only add if background exists to sample from
      if (bgTexture) {
        const bandGeo = new THREE.PlaneBufferGeometry(1200, 240, 1, 1);
        const bandMat = new THREE.RawShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(0xffd86b) },
            uBgTex: { value: bgTexture },
          },
          vertexShader:
            'precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){ vUv = uv; vec4 pos = vec4(position,1.0); gl_Position = projectionMatrix * modelViewMatrix * pos; }',
          fragmentShader:
            'precision highp float; varying vec2 vUv; uniform float uTime; uniform vec3 uColor; uniform sampler2D uBgTex; float rand(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);} float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=rand(i); float b=rand(i+vec2(1.0,0.0)); float c=rand(i+vec2(0.0,1.0)); float d=rand(i+vec2(1.0,1.0)); vec2 u=f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; } void main(){ vec2 uv = vUv * vec2(4.0,1.0) - vec2(2.0,0.0); float n = noise(uv * 6.0 + uTime * 0.02); float band = smoothstep(0.55, 0.82, 0.5 + 0.35 * sin(uv.y * 6.2831) + n * 0.25); vec3 bgc = texture2D(uBgTex, vUv * 0.5 + 0.5).rgb; vec3 col = mix(bgc * 0.28, uColor * 1.25, band); float alpha = band * 0.6; gl_FragColor = vec4(col, alpha); }',
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.rotation.x = Math.PI * 0.5 * 0.98;
        band.position.set(0, -20, -120);
        band.renderOrder = -2;
        band.frustumCulled = false;
        scene.add(band);
        nebulaPlanes.push(band);
      }

      // BACKGROUND starfield (distant)
      const backStarCount = Math.max(2000, Math.floor(starCount * 0.8));
      const backPositions = new Float32Array(backStarCount * 3);
      const backSeeds = new Float32Array(backStarCount);
      const backRadius = 380;
      for (let i = 0; i < backStarCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = backRadius + (Math.random() - 0.5) * 12;
        backPositions[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * r;
        backPositions[i * 3 + 1] = Math.cos(phi) * r * 0.9;
        backPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
        backSeeds[i] = Math.random();
      }
      const backGeom = new THREE.BufferGeometry();
      backGeom.setAttribute("position", new THREE.BufferAttribute(backPositions, 3));
      backGeom.setAttribute("aSeed", new THREE.BufferAttribute(backSeeds, 1));
      const backMat = new THREE.PointsMaterial({
        size: 1.2,
        map: _glowTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const backStars = new THREE.Points(backGeom, backMat);
      backStars.renderOrder = -5;
      backStars.frustumCulled = false;
      scene.add(backStars);

      // STARFIELD shader points (closer stars)
      const starGeom = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starSeed = new Float32Array(starCount);
      for (let i = 0; i < starCount; i++) {
        const r = 50 + Math.random() * 120;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        starPositions[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * r;
        starPositions[i * 3 + 1] = Math.cos(phi) * r * 0.6;
        starPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
        starSeed[i] = Math.random();
      }
      starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      starGeom.setAttribute("aSeed", new THREE.BufferAttribute(starSeed, 1));

      const starVS = `
        precision highp float;
        precision highp int;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        attribute vec3 position;
        attribute float aSeed;
        uniform float uTime;
        varying float vSeed;
        void main(){
          vSeed = aSeed;
          float flick = 0.5 + 0.5 * sin(uTime * (0.3 + aSeed * 6.0) + aSeed * 57.0);
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          float size = (1.2 + aSeed * 2.8) * (1.0 + flick * 0.9);
          gl_PointSize = size;
        }
      `;

      const starFS = `
        precision highp float;
        precision highp int;
        varying float vSeed;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        void main(){
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.45, 0.5, d);
          vec3 color = mix(uColorA, uColorB, vSeed * 0.9);
          float corona = 1.0 - smoothstep(0.0, 0.6, d);
          gl_FragColor = vec4(color * (0.8 + 0.4 * vSeed) * corona, alpha * (0.6 + 0.4 * vSeed));
        }
      `;

      const starMat = new THREE.RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: pal.accent.clone() },
          uColorB: { value: pal.primary.clone() },
        },
        vertexShader: starVS,
        fragmentShader: starFS,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(starGeom, starMat);
      scene.add(stars);

      // Nebula procedural planes (small count)
      const nebulaCount = 1;
      const nebulaColors = [
        pal.primary.clone().multiplyScalar(0.55),
        pal.accent.clone().lerp(pal.primary, 0.18),
        new THREE.Color().copy(pal.primary).lerp(pal.dark, 0.25),
      ];

      const nebulaVertex = `
        precision highp float;
        precision highp int;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `;

      const nebulaFragmentHeader = `
        precision highp float;
        precision highp int;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        uniform sampler2D uBgTex;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<5;i++){ v += a * noise(p); p *= 2.0; a *= 0.5; } return v; }
      `;

      const nebulaFragment = nebulaFragmentHeader + `
        void main(){
          vec2 uv = vUv * vec2(1.5,1.0) - 0.5;
          float t = uTime * 0.05;
          float n = fbm(uv * 3.0 + vec2(t, -t*0.4));
          float n2 = fbm(uv * 6.0 - vec2(t*0.5, t*0.2));
          float cloud = smoothstep(0.4, 0.85, n + 0.4 * n2);
          vec3 col = uColor * (0.6 + 0.8 * cloud);
          vec3 bgcol = texture2D(uBgTex, vUv * 0.5 + vec2(0.5)).rgb;
          col = mix(col, bgcol, 0.15);
          float alpha = cloud * 0.28;
          gl_FragColor = vec4(col, alpha);
        }
      `;

      for (let i = 0; i < nebulaCount; i++) {
        const geo = new THREE.PlaneBufferGeometry(180, 100, 1, 1);
        const mat = new THREE.RawShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: nebulaColors[i % nebulaColors.length] },
            uBgTex: { value: bgTexture || new THREE.Texture() },
          },
          vertexShader: nebulaVertex,
          fragmentShader: nebulaFragment,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((i - 1) * 12.0, -6 + i * 4.0, -60 - i * 20);
        mesh.rotation.y = 0.20 * (i - 1);
        scene.add(mesh);
        nebulaPlanes.push(mesh);
      }

      // Crystal centerpiece
      const icoGeo = new THREE.IcosahedronBufferGeometry(1.6 * crystalSize, 5);
      icoGeo.computeVertexNormals();

      const crystalVertexShader = `
        precision highp float; precision highp int; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
        varying vec3 vNormal; varying vec3 vPosition; uniform float uTime; uniform float uDisplace; attribute vec3 position; attribute vec3 normal; uniform vec2 uMouse;
        vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x,289.0); }
        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0,1.0/3.0); const vec4 D = vec4(0.0,0.5,1.0,2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0);
          vec4 p = permute( permute( permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n0; float n1; float n2; float n3;
          vec4 j = p - 49.0 * floor(p / 49.0);
          vec4 x_ = floor(j / 7.0);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = (x_ * 2.0 + 0.5)/7.0 - 1.0;
          vec4 y = (y_ * 2.0 + 0.5)/7.0 - 1.0;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 g0 = vec3(a0.x, a0.y, h.x);
          vec3 g1 = vec3(a0.z, a0.w, h.y);
          vec3 g2 = vec3(a1.x, a1.y, h.z);
          vec3 g3 = vec3(a1.z, a1.w, h.w);
          vec4 norm = inversesqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
          g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;
          float t0 = 0.6 - dot(x0,x0); if(t0<0.0) n0 = 0.0; else { t0 *= t0; n0 = t0 * t0 * dot(g0, x0); }
          float t1 = 0.6 - dot(x1,x1); if(t1<0.0) n1 = 0.0; else { t1 *= t1; n1 = t1 * t1 * dot(g1, x1); }
          float t2 = 0.6 - dot(x2,x2); if(t2<0.0) n2 = 0.0; else { t2 *= t2; n2 = t2 * t2 * dot(g2, x2); }
          float t3 = 0.6 - dot(x3,x3); if(t3<0.0) n3 = 0.0; else { t3 *= t3; n3 = t3 * t3 * dot(g3, x3); }
          return 42.0 * (n0 + n1 + n2 + n3);
        }
        void main(){
          vNormal = normal;
          vec3 pos = position;
          // slower noise & internal sin multipliers to match a calmer wobble
          float n = snoise(vec3(position * 1.5) + uTime * 0.35);
          float displacement = n * uDisplace * (0.6 + 0.4 * sin(uTime * 0.35 + position.x * 2.0));
          vec2 m = (uMouse - 0.5) * 2.0;
          pos += normal * displacement + vec3(m.x, m.y, 0.0) * 0.12;
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      const crystalFragmentShader = `
        precision highp float; precision highp int;
        varying vec3 vNormal; varying vec3 vPosition;
        uniform vec3 uPrimary; uniform vec3 uSecondary; uniform float uTime;
        void main(){
          vec3 N = normalize(vNormal);
          float fresnel = pow(1.0 - max(0.0, dot(N, vec3(0.0,0.0,1.0))), 2.0);
          float h = (vPosition.y + 1.6) * 0.4;
          vec3 base = mix(uPrimary, uSecondary, clamp(h,0.0,1.0));
          // slower pulse (reduced multiplier)
          float pulse = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 0.5 + vPosition.x * 1.5));
          vec3 col = base * pulse;
          col += vec3(1.0,0.8,1.0) * fresnel * 0.45;
          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const crystalMaterial = new THREE.RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uDisplace: { value: 0.85 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uPrimary: { value: pal.primary.clone() },
          uSecondary: { value: pal.accent.clone() },
        },
        vertexShader: crystalVertexShader,
        fragmentShader: crystalFragmentShader,
        side: THREE.DoubleSide,
        transparent: false,
      });

      const crystal = new THREE.Mesh(icoGeo, crystalMaterial);
      crystal.scale.setScalar(1.0);
      scene.add(crystal);

      const wireMat = new THREE.MeshBasicMaterial({ color: pal.accent.clone(), wireframe: true, opacity: 0.10, transparent: true });
      const wire = new THREE.Mesh(icoGeo.clone(), wireMat);
      wire.scale.setScalar(1.012);
      scene.add(wire);

      // particles (background)
      const ptsGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const seeds = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        const r = 6.0 + Math.random() * 14.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        positions[i * 3 + 0] = Math.cos(theta) * Math.cos(phi) * r;
        positions[i * 3 + 1] = Math.sin(phi) * r * 0.6;
        positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
        seeds[i] = Math.random();
      }
      ptsGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      ptsGeom.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const ptsVS = `
        precision highp float; precision highp int; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; attribute vec3 position; attribute float aSeed; uniform float uTime; uniform vec2 uMouse; varying float vSeed; void main(){ vSeed = aSeed; vec3 pos = position; float t = uTime * (0.15 + aSeed * 0.6); pos.x += cos(t * (0.6 + aSeed)) * (0.5 + aSeed * 1.2); pos.y += sin(t * (0.4 + aSeed)) * (0.5 + aSeed * 0.6); vec2 m = (uMouse - 0.5) * 6.0; pos.x += m.x * (0.4 * aSeed); pos.z += m.y * (0.4 * aSeed); gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0); gl_PointSize = 2.0 + 6.0 * (1.0 - aSeed); }
      `;

      const ptsFS = `
        precision highp float; precision highp int; varying float vSeed; uniform vec3 uPrimary; uniform vec3 uSecondary; void main(){ float t = vSeed; vec3 c = mix(uPrimary, uSecondary, t); float d = length(gl_PointCoord - vec2(0.5)); float alpha = 1.0 - smoothstep(0.4, 0.5, d); gl_FragColor = vec4(c * 0.9, alpha * 0.9); }
      `;

      const ptsMaterial = new THREE.RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uPrimary: { value: pal.primary.clone() },
          uSecondary: { value: pal.accent.clone() },
        },
        vertexShader: ptsVS,
        fragmentShader: ptsFS,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(ptsGeom, ptsMaterial);
      scene.add(points);

      // subtle ring sprite beneath crystal
      const spriteMat = new THREE.SpriteMaterial({
        map: _glowTexture,
        color: pal.primary.clone(),
        opacity: 0.08,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.setScalar(14);
      sprite.position.set(0, -1.2, -2.6);
      scene.add(sprite);

      // (Planets & Supernova removed)

      // Shooting stars
      const shootingStars = [];
      const starMeshGeom = new THREE.SphereBufferGeometry(0.06, 8, 6);

      function spawnStar() {
        const edge = Math.random() > 0.5 ? 1 : -1;
        const x = (Math.random() * 2 - 1) * 18 * edge;
        const y = (Math.random() * 2 - 1) * 8;
        const z = -20 - Math.random() * 40;
        const speed = 0.6 + Math.random() * 1.8;
        const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.8;
        const vx = Math.cos(angle) * speed * edge;
        const vy = Math.sin(angle) * speed * 0.6;
        const mesh = new THREE.Mesh(starMeshGeom, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 }));
        mesh.position.set(x, y, z);

        const trailCount = 8;
        const trailPositions = new Float32Array(trailCount * 3);
        for (let i = 0; i < trailCount; i++) {
          trailPositions[i * 3 + 0] = x;
          trailPositions[i * 3 + 1] = y;
          trailPositions[i * 3 + 2] = z;
        }
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
        const trailMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
        const trail = new THREE.Line(trailGeo, trailMat);
        scene.add(mesh);
        scene.add(trail);
        shootingStars.push({ mesh, trail, vx, vy, life: 0, maxLife: 60 + Math.random() * 90, trailCount });
      }

      // Interaction: mouse -> update shader uniforms
      const mouse = { x: 0.5, y: 0.5 };
      const onMove = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = THREE.MathUtils.clamp(x, 0, 1);
        mouse.y = THREE.MathUtils.clamp(y, 0, 1);
        if (crystalMaterial && crystalMaterial.uniforms) crystalMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
        if (ptsMaterial && ptsMaterial.uniforms) ptsMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
      };
      if (interactive) window.addEventListener("mousemove", onMove);

      // parse crystalSpeed (allow number or object)
      const speedCfg = typeof crystalSpeed === "number"
        ? { spin: crystalSpeed, wobble: crystalSpeed, wobbleAmp: 0.035 }
        : { spin: 0.0025, wobble: 0.05, wobbleAmp: 0.035, ...crystalSpeed };

      // animation loop
      let t0 = performance.now() / 1000;
      let lastFrame = t0;
      const animate = () => {
        const t = performance.now() / 1000 - t0;
        if (starMat && starMat.uniforms) starMat.uniforms.uTime.value = t;
        if (ptsMaterial && ptsMaterial.uniforms) ptsMaterial.uniforms.uTime.value = t;
        if (crystalMaterial && crystalMaterial.uniforms) crystalMaterial.uniforms.uTime.value = t;
        nebulaPlanes.forEach((n, i) => {
          if (n.material && n.material.uniforms) n.material.uniforms.uTime.value = t * (0.6 + i * 0.2);
        });

        // use configured spin & wobble; wobbleAmp controls amplitude
        crystal.rotation.y += speedCfg.spin;
        crystal.rotation.x = Math.sin(t * speedCfg.wobble) * (speedCfg.wobbleAmp);
        wire.rotation.copy(crystal.rotation);

        // (planets loop removed)

        if (Math.random() < shootingStarRate) spawnStar();
        // maybeSpawnSupernovaRandom removed

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.mesh.position.x += s.vx * 0.9;
          s.mesh.position.y += s.vy * 0.9;
          s.mesh.position.z += 0.25;
          s.life++;
          const attr = s.trail.geometry.attributes.position;
          for (let k = s.trailCount - 1; k > 0; k--) {
            attr.array[k * 3 + 0] = attr.array[(k - 1) * 3 + 0];
            attr.array[k * 3 + 1] = attr.array[(k - 1) * 3 + 1];
            attr.array[k * 3 + 2] = attr.array[(k - 1) * 3 + 2];
          }
          attr.array[0] = s.mesh.position.x;
          attr.array[1] = s.mesh.position.y;
          attr.array[2] = s.mesh.position.z;
          attr.needsUpdate = true;
          const fade = 1.0 - s.life / s.maxLife;
          s.mesh.material.opacity = Math.max(0, fade);
          s.trail.material.opacity = Math.max(0, fade * 0.7);
          if (s.life > s.maxLife) {
            scene.remove(s.mesh);
            scene.remove(s.trail);
            try { s.mesh.geometry.dispose(); } catch (e) {}
            try { s.mesh.material.dispose(); } catch (e) {}
            try { s.trail.geometry.dispose(); } catch (e) {}
            try { s.trail.material.dispose(); } catch (e) {}
            shootingStars.splice(i, 1);
          }
        }

        // (supernovas update removed)

        lastFrame = performance.now() / 1000;
        renderer.render(scene, camera);
        stateRef.current.raf = requestAnimationFrame(animate);
      };

      stateRef.current.raf = requestAnimationFrame(animate);

      // resize handler
      const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // persist state for cleanup
      stateRef.current = {
        renderer,
        scene,
        camera,
        onResize,
        onMove,
        // onDblClick removed
        raf: stateRef.current.raf,
        shootingStars,
        nebulaPlanes,
        // planets removed
        // supernovas removed
        overlayDiv,
      };
    };

    start();

    return () => {
      mounted = false;
      const s = stateRef.current;
      if (s) {
        if (s.raf) cancelAnimationFrame(s.raf);
        if (s.overlayDiv && s.overlayDiv.parentNode) s.overlayDiv.parentNode.removeChild(s.overlayDiv);
        // onDblClick was removed; only remove mouse/resize if present
        if (s.onMove) window.removeEventListener("mousemove", s.onMove);
        if (s.onResize) window.removeEventListener("resize", s.onResize);
        try {
          // dispose everything in scene
          s.scene.traverse((o) => {
            if (o.geometry) try { o.geometry.dispose(); } catch (e) {}
            if (o.material) {
              if (Array.isArray(o.material)) o.material.forEach((m) => { try { m.dispose(); } catch (e) {} });
              else try { o.material.dispose(); } catch (e) {}
            }
            // textures attached as map on materials get disposed via material.dispose usually,
            // but attempt a safe removal for CanvasTexture or other texture objects:
            if (o.material && o.material.map) try { o.material.map.dispose(); } catch (e) {}
            if (o.texture) try { o.texture.dispose(); } catch (e) {}
          });
          if (s.renderer && s.renderer.domElement && s.renderer.domElement.parentNode) s.renderer.domElement.parentNode.removeChild(s.renderer.domElement);
          if (s.renderer) try { s.renderer.dispose(); } catch (e) {}
        } catch (err) {
          // swallow cleanup errors
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    interactive,
    primary,
    secondary,
    bg,
    particleCount,
    crystalSize,
    pixelRatio,
    // planetCount removed
    shootingStarRate,
    // supernovaRate removed
    // supernovaEnabled removed
    starCount,
    textureUrl,
    crystalSpeed,
  ]);

  const bgColor = typeof bg === "number" ? `#${(bg >>> 0).toString(16).padStart(6, "0")}` : String(bg);

  const containerStyle = {
    position: "fixed",
    zIndex: 0,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: interactive ? "auto" : "none",
    overflow: "hidden",
    backgroundColor: bgColor, // fallback while canvas is painting
    // hint to the compositor to avoid hairline gaps during transforms
    WebkitTransformStyle: "preserve-3d",
    transformStyle: "preserve-3d",
    willChange: "opacity, transform",
    ...style,
  };

  return <div ref={containerRef} className={className} style={containerStyle} aria-hidden={!interactive} />;
}
