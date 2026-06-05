"use client";
import { useEffect, useRef } from "react";

const CARDS: [string, string, string][] = [
  ["#12002e", "#7c3aed", "PROJECT 01"],
  ["#001529", "#0ea5e9", "PROJECT 02"],
  ["#001a0f", "#10b981", "PROJECT 03"],
  ["#1a0010", "#e11d48", "PROJECT 04"],
  ["#0d0d20", "#6366f1", "PROJECT 05"],
  ["#1a0900", "#f59e0b", "PROJECT 06"],
  ["#001919", "#14b8a6", "PROJECT 07"],
  ["#0c0020", "#a855f7", "PROJECT 08"],
  ["#001a0a", "#22c55e", "PROJECT 09"],
];

const CARD_W = 2.9;
const CARD_H = 1.8;
const ORBIT_R = 4.2;

function buildTexture(dark: string, accent: string, label: string, THREE: typeof import("three")) {
  const W = 512, H = 320;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, dark);
  bg.addColorStop(1, accent + "88");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Dot grid
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  for (let x = 24; x < W; x += 28)
    for (let y = 24; y < H; y += 28) {
      ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2); ctx.fill();
    }

  // Glow orb
  const rg = ctx.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, 90);
  rg.addColorStop(0, accent + "66");
  rg.addColorStop(0.5, accent + "22");
  rg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = rg;
  ctx.beginPath(); ctx.arc(W / 2, H / 2, 90, 0, Math.PI * 2); ctx.fill();

  // Inner ring
  ctx.strokeStyle = accent + "88"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(W / 2, H / 2, 62, 0, Math.PI * 2); ctx.stroke();

  // Outer dashed ring
  ctx.strokeStyle = accent + "33"; ctx.lineWidth = 0.5;
  ctx.setLineDash([3, 10]);
  ctx.beginPath(); ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "bold 11px 'Courier New',monospace";
  ctx.fillText(label, 18, 26);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "9px 'Courier New',monospace";
  ctx.fillText("KAYKAV ACADEMY", 18, H - 14);

  return new THREE.CanvasTexture(cv);
}

export default function HeroCollage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let alive = true;

    (async () => {
      const THREE = await import("three");
      if (!alive) return;

      const W = wrap.clientWidth  || window.innerWidth;
      const H = wrap.clientHeight || window.innerHeight;

      // ── Renderer ──────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      wrap.appendChild(renderer.domElement);

      // ── Scene ─────────────────────────────────────────────────────────
      const scene  = new THREE.Scene();

      // Camera: pulled back, offset left so orbit sits on right of screen
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(-2, 0, 11);
      camera.lookAt(2, 0, 0);

      // ── Orbit group ───────────────────────────────────────────────────
      const orbit = new THREE.Group();
      orbit.position.set(2, 0, 0);   // push orbit to right
      scene.add(orbit);

      // ── Cards ─────────────────────────────────────────────────────────
      const meshes: THREE.Mesh[] = [];

      CARDS.forEach(([dark, accent, label], i) => {
        const angle = (i / CARDS.length) * Math.PI * 2;

        // Curved geometry — vertex-displaced plane
        const geo = new THREE.PlaneGeometry(CARD_W, CARD_H, 12, 1);
        const pos = geo.attributes.position as THREE.BufferAttribute;
        for (let v = 0; v < pos.count; v++) {
          const xn = pos.getX(v) / (CARD_W * 0.5);
          pos.setZ(v, -0.08 * xn * xn);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        const mesh = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            map: buildTexture(dark, accent, label, THREE),
            side: THREE.DoubleSide,   // no face-culling issues
            transparent: true,
            opacity: 1,
          })
        );

        // Position on orbit ring
        mesh.position.set(
          Math.sin(angle) * ORBIT_R,
          Math.sin(angle * 2.2 + i * 0.3) * 0.85,
          Math.cos(angle) * ORBIT_R
        );

        // Face toward orbit centre (world origin of orbit = 0,0,0 local)
        // use target = (0, mesh.position.y, 0) in orbit-local → that's correct because
        // mesh is a child of orbit, but lookAt takes WORLD coords.
        // orbit.position = (2,0,0), so orbit local origin in world = (2,0,0)
        // lookAt world target for orbit-centre-at-card-height = (2, worldY, 0)
        // worldY = orbit.position.y + mesh.position.y = 0 + localY = localY
        mesh.lookAt(2, mesh.position.y, 0);

        orbit.add(mesh);
        meshes.push(mesh);
      });

      // ── Event listeners ───────────────────────────────────────────────
      let tx = 0, ty = 0, mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth  - 0.5) * 2;
        ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      const onResize = () => {
        if (!wrap || !alive) return;
        const w = wrap.clientWidth, h = wrap.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ───────────────────────────────────────────────────
      let t = 0;
      const tmp = new THREE.Vector3();

      const loop = () => {
        if (!alive) return;
        raf = requestAnimationFrame(loop);
        t += 0.004;

        // Lerp mouse
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;

        // Rotate orbit
        orbit.rotation.y += 0.0035;

        // Per-card float + DoF opacity
        meshes.forEach((mesh, i) => {
          // Gentle float
          mesh.position.y =
            Math.sin(t * 0.55 + i * 1.1) * 0.15 +
            Math.sin((i / CARDS.length) * Math.PI * 4) * 0.7;

          // Re-face orbit centre each frame (world coords)
          mesh.lookAt(2, mesh.position.y, 0);

          // Depth → opacity
          mesh.getWorldPosition(tmp);
          const op = THREE.MathUtils.mapLinear(tmp.z, -ORBIT_R - 1, ORBIT_R + 1, 0.25, 1);
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.25, Math.min(1, op));
        });

        // Camera parallax
        camera.position.x += (-2 + mx * 1.0 - camera.position.x) * 0.04;
        camera.position.y += (my * 0.8 - camera.position.y) * 0.04;
        camera.lookAt(2, 0, 0);

        renderer.render(scene, camera);
      };

      loop();

      // ── Cleanup ───────────────────────────────────────────────────────
      // Store cleanup fn where the return can reach it
      (wrapRef as any)._cleanup = () => {
        alive = false;
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        meshes.forEach(m => {
          m.geometry.dispose();
          const mat = m.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      (wrapRef as any)._cleanup?.();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
