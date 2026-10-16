import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { S, C, D, M, finalState } from './state';
import { makeIconCanvas } from './icons';
import { ECOSYSTEM } from '../data/ecosystem';
import { ASSETS } from '../config/site';
import { clamp } from '../utils/scroll';

const ICON_POSITIONS: [number, number, number][] = [[-6.2, 3.4, -3.5], [-4.4, 5, -5.5], [-1.8, 5.6, -6.5], [1.4, 4.6, -5], [4.6, 5.2, -6], [6.6, 3.1, -4], [-7.2, 1.2, -6], [7.4, 0.8, -6.5], [-2.6, 2.9, -2.2], [3.2, 3.3, -2.4]];
const N = 14; // bars
const barHeight = (i: number) => 0.5 + i * 0.3 + Math.sin(i * 1.7) * 0.22;

/** Real-time 3D: green profit graph, money icons, pillars (Why Us), ecosystem network, floating logo. */
export default function FinanceScene({ reduce, onFail }: { reduce: boolean; onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!, small = innerWidth < 820, touch = matchMedia('(hover:none)').matches;
    let R: THREE.WebGLRenderer;
    try { R = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' }); if (!R.getContext()) throw new Error('no gl'); } catch { onFail(); return; }
    R.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 1.75));
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x05030d, 0.026);
    const cam = new THREE.PerspectiveCamera(46, 1, 0.1, 150);
    scene.add(new THREE.AmbientLight(0x4a3c9a, 2.6));
    const key = new THREE.DirectionalLight(0xcdbfff, 2.4); key.position.set(4, 8, 6); scene.add(key);
    const grid = new THREE.GridHelper(120, 90, 0x7c5cff, 0x2a1d66); grid.position.set(0, -2, -45);
    const gm = grid.material as THREE.Material; gm.transparent = true; gm.opacity = 0.4; scene.add(grid);

    // --- green profit graph ---
    const bars = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshStandardMaterial({ color: 0x16c47f, emissive: 0x064d2e, metalness: 0.45, roughness: 0.3 }), N);
    scene.add(bars);
    const tops: THREE.Vector3[] = []; for (let i = 0; i < N; i++) tops.push(new THREE.Vector3((i - 6.5) * 0.9, -2 + barHeight(i) + 0.35, -3));
    const curve = new THREE.CatmullRomCurve3(tops);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.035, 6, false), new THREE.MeshBasicMaterial({ color: 0xa8ffd6, fog: false }));
    const tubeIdx = tube.geometry.index!.count; scene.add(tube);
    const tracer = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false }));
    tracer.add(new THREE.PointLight(0x3dffa8, 30, 9, 2)); scene.add(tracer);
    const dots = tops.map(p => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshBasicMaterial({ color: 0x7dffc0, fog: false })); m.position.copy(p); m.scale.setScalar(0); scene.add(m); return m; });

    // --- money icons ---
    const icons = ICON_POSITIONS.map((p, i) => {
      const tex = new THREE.CanvasTexture(makeIconCanvas(i % 5)); tex.colorSpace = THREE.SRGBColorSpace;
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false, opacity: 0 }));
      sp.scale.setScalar(1.15 + (i % 3) * 0.2); sp.position.set(...p); sp.userData = { x: p[0], y: p[1] }; scene.add(sp); return sp;
    });

    // --- particles ---
    const count = small ? 300 : 1000, pp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { pp[i * 3] = (Math.random() - 0.5) * 50; pp[i * 3 + 1] = Math.random() * 14 - 3; pp[i * 3 + 2] = Math.random() * -70 + 10; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.05, color: 0xa88bff, transparent: true, opacity: 0.7, depthWrite: false })));

    // --- pillars (Why Us); the short keystone sits on the camera path ---
    const px = [-6.5, -3.6, 0, 3.6, 6.5], ph = [4.8, 6.2, 2.6, 5.6, 4.4];
    const pillars = px.map((x, i) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x1a1140, emissive: 0x7c5cff, emissiveIntensity: 0.1, metalness: 0.7, roughness: 0.25 }));
      m.userData = { h: ph[i] }; m.position.set(x, -2, i === 2 ? -22 : -19); m.scale.set(1, 0.1, 1); scene.add(m); return m;
    });
    const tp = px.map((x, i) => new THREE.Vector3(x, -2 + ph[i], i === 2 ? -22 : -19)), seg: THREE.Vector3[] = [];
    for (let i = 0; i < 4; i++) seg.push(tp[i], tp[i + 1]);
    const pLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), new THREE.LineBasicMaterial({ color: 0xb9a7ff, transparent: true, opacity: 0 })); scene.add(pLines);

    // --- ecosystem network ---
    const net = new THREE.Group(); net.position.set(0, 1.6, -42); scene.add(net);
    const ep: THREE.Vector3[] = [], nodes: THREE.Mesh[] = [], ga = Math.PI * (3 - Math.sqrt(5));
    ECOSYSTEM.forEach((_, i) => {
      let p = new THREE.Vector3();
      if (i) { const k = i - 1, y = 1 - (k / 7) * 2, r = Math.sqrt(1 - y * y); p = new THREE.Vector3(Math.cos(k * ga * 1.3) * r * 4.4, y * 3.2, Math.sin(k * ga * 1.3) * r * 4.4); }
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(i ? 0.34 : 0.6, 1), new THREE.MeshStandardMaterial({ color: 0x2a1b7a, emissive: 0x7c5cff, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2, flatShading: true }));
      m.position.copy(p); net.add(m); nodes.push(m); ep.push(p);
    });
    const lv: THREE.Vector3[] = []; for (let i = 1; i < 9; i++) { lv.push(ep[0], ep[i], ep[i], ep[(i % 8) + 1]); }
    net.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lv), new THREE.LineBasicMaterial({ color: 0x8d72ff, transparent: true, opacity: 0.45 })));

    // --- floating logo + halo ---
    const hc = document.createElement('canvas'); hc.width = hc.height = 128; const hx = hc.getContext('2d')!;
    const g = hx.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(124,92,255,.6)'); g.addColorStop(1, 'rgba(124,92,255,0)'); hx.fillStyle = g; hx.fillRect(0, 0, 128, 128);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(hc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0 }));
    halo.position.set(2.6, 2.6, -4.2); scene.add(halo);
    let logo: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null, logoTex: THREE.Texture | null = null;
    new THREE.TextureLoader().load(ASSETS.logo, t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; logoTex = t;
      logo = new THREE.Mesh(new THREE.PlaneGeometry(5, (5 * t.image.height) / t.image.width), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, fog: false, opacity: 0 }));
      logo.position.set(2.6, 2.6, -4); scene.add(logo);
    });

    const resize = () => { R.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); if (reduce) draw(0); };
    const o = new THREE.Object3D(), look = new THREE.Vector3(C.lx, C.ly, C.lz), tgt = new THREE.Vector3(), lt = new THREE.Vector3(), one = new THREE.Vector3();
    let raf = 0;
    function draw(T: number) {
      const bp = clamp(S.intro / 0.6), lp = clamp((S.intro - 0.3) / 0.65);
      for (let i = 0; i < N; i++) { const p = clamp(bp * (N + 3) - i), e = 1 - Math.pow(1 - p, 3), h = Math.max(0.001, barHeight(i) * e); o.position.set((i - 6.5) * 0.9, -2 + h / 2, -3); o.scale.set(1, h, 1); o.updateMatrix(); bars.setMatrixAt(i, o.matrix); }
      bars.instanceMatrix.needsUpdate = true;
      tube.geometry.setDrawRange(0, Math.floor((tubeIdx * lp) / 3) * 3);
      tracer.position.copy(curve.getPoint(clamp(S.intro < 1 ? lp : (T * 0.07) % 1))); tracer.visible = lp > 0;
      dots.forEach((m, i) => m.scale.setScalar(clamp((lp * (N - 1) - i) * 3)));
      pillars.forEach((m, i) => { const l = clamp(S.pillars - i), mat = m.material as THREE.MeshStandardMaterial; m.scale.y = 0.1 + m.userData.h * l; m.position.y = -2 + m.scale.y / 2; mat.emissiveIntensity = 0.1 + l * 1.5; });
      pLines.material.opacity = clamp(S.pillars - 4) * 0.8;
      net.rotation.y = T * 0.08;
      nodes.forEach((m, i) => { const f = i === S.focus, mat = m.material as THREE.MeshStandardMaterial; m.scale.lerp(one.setScalar(f ? 1.8 : 1), 0.08); mat.emissiveIntensity += ((f ? 2.2 : 0.5) - mat.emissiveIntensity) * 0.08; });
      if (logo) { const a = reduce ? 0.9 : clamp(S.intro * 1.6 - 0.9) * S.logo; logo.material.opacity += (a - logo.material.opacity) * 0.1; halo.material.opacity = logo.material.opacity * 0.5; logo.position.y = 2.6 + Math.sin(T * 0.7) * 0.14; logo.rotation.y = Math.sin(T * 0.4) * 0.2 + M.x * 0.25; halo.position.y = logo.position.y; }
      icons.forEach((sp, i) => { sp.position.y = sp.userData.y + Math.sin(T * 0.8 + i) * 0.18; sp.position.x = sp.userData.x + Math.cos(T * 0.5 + i) * 0.08; sp.material.rotation = Math.sin(T * 0.4 + i) * 0.12; sp.material.opacity += ((reduce ? 0.85 : clamp(S.intro * 1.6 - 0.7) * S.icons * 0.9) - sp.material.opacity) * 0.08; });
      tgt.set(C.x + M.x * 0.5, C.y - M.y * 0.3, C.z + D.z); cam.position.lerp(tgt, 0.08); look.lerp(lt.set(C.lx, C.ly, C.lz), 0.08); cam.lookAt(look);
      R.render(scene, cam);
    }
    const loop = (t: number) => { draw(t * 0.001); raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => { M.x = (e.clientX / innerWidth) * 2 - 1; M.y = (e.clientY / innerHeight) * 2 - 1; };
    resize(); addEventListener('resize', resize);
    if (reduce) { finalState(); cam.position.set(C.x, C.y, C.z); draw(0); } else { raf = requestAnimationFrame(loop); if (!touch) addEventListener('pointermove', move); }
    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', move);
      scene.traverse(obj => { const m = obj as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach(x => { (x as THREE.MeshBasicMaterial).map?.dispose(); x.dispose(); }); });
      logoTex?.dispose(); R.dispose();
    };
  }, [reduce, onFail]);
  return <canvas id="gl" ref={ref} aria-hidden="true" />;
}
