"use client";
import { useEffect, useRef } from "react";

// Card visual configs — each has a distinct art style
const CARDS = [
  { w: 3.2, h: 2.0, art: "glowSphere",  tiltX:  0.1,  tiltZ: -0.05 },
  { w: 2.6, h: 1.7, art: "waveRings",   tiltX: -0.15, tiltZ:  0.08 },
  { w: 2.4, h: 1.9, art: "minimalOrb",  tiltX:  0.05, tiltZ: -0.12 },
  { w: 3.0, h: 1.9, art: "landscape",   tiltX: -0.08, tiltZ:  0.04 },
  { w: 2.1, h: 1.6, art: "warmSil",     tiltX:  0.12, tiltZ:  0.06 },
  { w: 2.3, h: 1.6, art: "blueGeo",     tiltX: -0.06, tiltZ: -0.10 },
  { w: 2.8, h: 1.8, art: "neonRings",   tiltX:  0.09, tiltZ:  0.07 },
  { w: 2.5, h: 1.7, art: "abstract",    tiltX: -0.13, tiltZ: -0.04 },
  { w: 1.9, h: 1.5, art: "ghost",       tiltX:  0.04, tiltZ:  0.09 },
];

type ArtType = typeof CARDS[number]["art"];

function drawArt(ctx: CanvasRenderingContext2D, W: number, H: number, art: ArtType) {
  // ── helpers ──────────────────────────────────────────────────────────
  const radial = (x: number, y: number, r0: number, r1: number, stops: [number, string][]) => {
    const g = ctx.createRadialGradient(x, y, r0, x, y, r1);
    stops.forEach(([t, c]) => g.addColorStop(t, c));
    return g;
  };
  const linear = (x0: number, y0: number, x1: number, y1: number, stops: [number, string][]) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(([t, c]) => g.addColorStop(t, c));
    return g;
  };

  ctx.clearRect(0, 0, W, H);

  if (art === "glowSphere") {
    // Dark bg
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#050010"], [1, "#150025"]]);
    ctx.fillRect(0, 0, W, H);
    // Pink glow sphere
    ctx.fillStyle = radial(W * 0.52, H * 0.44, 0, W * 0.38, [
      [0, "#f8bbd0"], [0.2, "#e040fb"], [0.55, "#7b1fa2"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W * 0.52, H * 0.44, W * 0.38, 0, Math.PI * 2); ctx.fill();
    // Blue secondary glow (bottom)
    ctx.fillStyle = radial(W * 0.38, H * 0.78, 0, W * 0.28, [
      [0, "rgba(33,150,243,0.9)"], [0.4, "rgba(33,100,200,0.4)"], [1, "transparent"]
    ]);
    ctx.fillRect(0, 0, W, H);
    // Specular highlight
    ctx.fillStyle = radial(W * 0.44, H * 0.33, 0, W * 0.12, [
      [0, "rgba(255,255,255,0.55)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W * 0.44, H * 0.33, W * 0.12, 0, Math.PI * 2); ctx.fill();
  }

  else if (art === "waveRings") {
    ctx.fillStyle = linear(0, 0, 0, H, [[0, "#001a1a"], [1, "#003330"]]);
    ctx.fillRect(0, 0, W, H);
    // Concentric wave rings
    for (let i = 12; i >= 1; i--) {
      const r = (i / 12) * W * 0.48;
      const alpha = 0.08 + (i / 12) * 0.55;
      ctx.strokeStyle = `rgba(0,230,180,${alpha})`;
      ctx.lineWidth = 1 + (12 - i) * 0.2;
      ctx.beginPath(); ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2); ctx.stroke();
    }
    // Center glow
    ctx.fillStyle = radial(W / 2, H / 2, 0, W * 0.18, [
      [0, "rgba(100,255,218,0.9)"], [0.5, "rgba(0,200,150,0.3)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W / 2, H / 2, W * 0.18, 0, Math.PI * 2); ctx.fill();
    // Extra rings offset
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(0,200,160,${0.12 + i * 0.04})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.arc(W * 0.35, H * 0.6, 20 + i * 22, 0, Math.PI * 2); ctx.stroke();
    }
  }

  else if (art === "minimalOrb") {
    // Off-white / light card
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#f7f3ed"], [1, "#e8e0d6"]]);
    ctx.fillRect(0, 0, W, H);
    // Shadow under sphere
    ctx.fillStyle = radial(W * 0.5, H * 0.72, 0, W * 0.28, [
      [0, "rgba(0,0,0,0.18)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.72, W * 0.28, H * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    // Main sphere
    ctx.fillStyle = radial(W * 0.44, H * 0.38, 0, W * 0.26, [
      [0, "#ffccbc"], [0.3, "#ff8a65"], [0.65, "#e64a19"], [1, "#bf360c"]
    ]);
    ctx.beginPath(); ctx.arc(W * 0.5, H * 0.46, W * 0.26, 0, Math.PI * 2); ctx.fill();
    // Specular
    ctx.fillStyle = radial(W * 0.43, H * 0.37, 0, W * 0.08, [
      [0, "rgba(255,255,255,0.7)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W * 0.43, H * 0.37, W * 0.08, 0, Math.PI * 2); ctx.fill();
    // Dark blob — negative-space object
    ctx.fillStyle = radial(W * 0.7, H * 0.52, 0, W * 0.14, [
      [0, "rgba(0,0,0,0.85)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.ellipse(W * 0.7, H * 0.52, W * 0.13, H * 0.22, 0.2, 0, Math.PI * 2); ctx.fill();
  }

  else if (art === "landscape") {
    // Dark monochrome mountain scene
    ctx.fillStyle = linear(0, 0, 0, H, [[0, "#0d0d14"], [0.5, "#1a1a28"], [1, "#111120"]]);
    ctx.fillRect(0, 0, W, H);
    // Mountains (layered silhouettes)
    const drawMtn = (pts: number[][], color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0, H);
      pts.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    };
    drawMtn([[0,H*0.8],[W*0.2,H*0.45],[W*0.38,H*0.62],[W*0.55,H*0.3],[W*0.72,H*0.5],[W,H*0.65]], "#1e1e30");
    drawMtn([[0,H*0.9],[W*0.15,H*0.6],[W*0.32,H*0.75],[W*0.5,H*0.42],[W*0.68,H*0.58],[W*0.85,H*0.7],[W,H*0.8]], "#2a2a3e");
    drawMtn([[0,H],[W*0.1,H*0.75],[W*0.28,H*0.88],[W*0.45,H*0.65],[W*0.6,H*0.8],[W,H*0.85]], "#1a1a2c");
    // Floating sphere above mountains
    ctx.fillStyle = radial(W * 0.5, H * 0.28, 0, W * 0.12, [
      [0, "rgba(200,200,220,0.9)"], [0.4, "rgba(120,120,150,0.5)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W * 0.5, H * 0.28, W * 0.12, 0, Math.PI * 2); ctx.fill();
    // Floating dark crystal shape
    ctx.fillStyle = "rgba(80,80,100,0.85)";
    ctx.save(); ctx.translate(W * 0.5, H * 0.42); ctx.rotate(0.3);
    ctx.beginPath(); ctx.moveTo(0,-18); ctx.lineTo(8,0); ctx.lineTo(0,28); ctx.lineTo(-8,0); ctx.closePath(); ctx.fill();
    ctx.restore();
    // Mist / fog layer
    ctx.fillStyle = linear(0, H * 0.55, 0, H * 0.75, [[0, "transparent"], [1, "rgba(30,30,48,0.6)"]]);
    ctx.fillRect(0, H * 0.55, W, H * 0.45);
  }

  else if (art === "warmSil") {
    // Warm amber/yellow
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#ffa000"], [0.5, "#ff8f00"], [1, "#e65100"]]);
    ctx.fillRect(0, 0, W, H);
    // Noise texture overlay
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const a = Math.random() * 0.06;
      ctx.fillStyle = `rgba(0,0,0,${a})`;
      ctx.fillRect(x, y, 2, 2);
    }
    // Dark silhouette — person shape
    ctx.fillStyle = "rgba(10,5,0,0.9)";
    // Head
    ctx.beginPath(); ctx.arc(W * 0.5, H * 0.28, W * 0.09, 0, Math.PI * 2); ctx.fill();
    // Body
    ctx.fillRect(W * 0.43, H * 0.36, W * 0.14, H * 0.35);
    // Subtle glow around silhouette
    ctx.fillStyle = radial(W * 0.5, H * 0.45, 0, W * 0.3, [
      [0, "transparent"], [0.6, "transparent"], [1, "rgba(0,0,0,0.3)"]
    ]);
    ctx.fillRect(0, 0, W, H);
  }

  else if (art === "blueGeo") {
    // Electric blue bg
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#0d1b8c"], [1, "#0a0066"]]);
    ctx.fillRect(0, 0, W, H);
    // Grid lines
    ctx.strokeStyle = "rgba(100,150,255,0.15)"; ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += W / 8) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += H / 6) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    // Kaleidoscope / mandala
    const cx2 = W / 2, cy2 = H / 2;
    for (let seg = 0; seg < 8; seg++) {
      ctx.save();
      ctx.translate(cx2, cy2); ctx.rotate((seg / 8) * Math.PI * 2);
      // Diamond shape
      const col = seg % 2 === 0 ? "#e040fb" : "#7c4dff";
      ctx.fillStyle = col + "cc";
      ctx.beginPath(); ctx.moveTo(0, -H*0.28); ctx.lineTo(W*0.18, 0); ctx.lineTo(0, H*0.28); ctx.lineTo(-W*0.18, 0); ctx.closePath(); ctx.fill();
      // Inner triangle
      ctx.fillStyle = (seg % 2 === 0 ? "#ff4081" : "#40c4ff") + "99";
      ctx.beginPath(); ctx.moveTo(0, -H*0.14); ctx.lineTo(W*0.09, H*0.07); ctx.lineTo(-W*0.09, H*0.07); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    // Center glow
    ctx.fillStyle = radial(cx2, cy2, 0, W * 0.15, [
      [0, "rgba(255,255,255,0.8)"], [0.3, "rgba(200,150,255,0.4)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(cx2, cy2, W * 0.15, 0, Math.PI * 2); ctx.fill();
  }

  else if (art === "neonRings") {
    ctx.fillStyle = "#010a04";
    ctx.fillRect(0, 0, W, H);
    // Background dot-grid
    ctx.fillStyle = "rgba(0,100,60,0.3)";
    for (let x = 16; x < W; x += 24) for (let y = 16; y < H; y += 24) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    }
    // Main neon rings (large, offset)
    for (let i = 8; i >= 1; i--) {
      const r = i * W * 0.058;
      const alpha = 0.15 + (8 - i) * 0.1;
      ctx.strokeStyle = `rgba(0,230,118,${alpha})`;
      ctx.lineWidth = 1;
      ctx.shadowColor = "#00e676"; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(W * 0.42, H * 0.5, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.shadowBlur = 0;
    // Secondary rings offset
    for (let i = 5; i >= 1; i--) {
      ctx.strokeStyle = `rgba(0,200,80,${i * 0.07})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.arc(W * 0.65, H * 0.62, i * 20, 0, Math.PI * 2); ctx.stroke();
    }
  }

  else if (art === "abstract") {
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#100020"], [1, "#06000f"]]);
    ctx.fillRect(0, 0, W, H);
    // Overlapping gradient blobs
    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, c: "#9c27b0" },
      { x: 0.65, y: 0.55, r: 0.3, c: "#e91e63" },
      { x: 0.5, y: 0.7, r: 0.25, c: "#3f51b5" },
      { x: 0.2, y: 0.65, r: 0.2, c: "#00bcd4" },
    ];
    ctx.globalCompositeOperation = "screen";
    blobs.forEach(b => {
      ctx.fillStyle = radial(b.x*W, b.y*H, 0, b.r*W, [
        [0, b.c + "cc"], [0.5, b.c + "44"], [1, "transparent"]
      ]);
      ctx.beginPath(); ctx.arc(b.x*W, b.y*H, b.r*W, 0, Math.PI*2); ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
    // Grainy overlay
    for (let i = 0; i < 300; i++) {
      const x = Math.random()*W, y = Math.random()*H, a = Math.random()*0.04;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  else if (art === "ghost") {
    ctx.fillStyle = linear(0, 0, W, H, [[0, "#d8d0c8"], [1, "#b8b0a8"]]);
    ctx.fillRect(0, 0, W, H);
    // Soft sphere
    ctx.fillStyle = radial(W*0.5, H*0.46, 0, W*0.24, [
      [0, "rgba(255,180,140,0.9)"], [0.5, "rgba(200,130,100,0.5)"], [1, "transparent"]
    ]);
    ctx.beginPath(); ctx.arc(W*0.5, H*0.46, W*0.24, 0, Math.PI*2); ctx.fill();
    // Diagonal lines texture
    ctx.strokeStyle = "rgba(0,0,0,0.06)"; ctx.lineWidth = 0.5;
    for (let i = -H; i < W + H; i += 14) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
    }
  }
}

function buildTexture(card: typeof CARDS[number], THREE: typeof import("three")) {
  const W = 512, H = Math.round(512 * (card.h / card.w));
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;
  drawArt(ctx, W, H, card.art);
  return new THREE.CanvasTexture(cv);
}

function buildCardGeo(w: number, h: number, THREE: typeof import("three")) {
  // Strong cylindrical curvature + mild vertical bow
  const geo = new THREE.PlaneGeometry(w, h, 20, 8);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const xn = pos.getX(i) / (w * 0.5);
    const yn = pos.getY(i) / (h * 0.5);
    pos.setZ(i, -0.45 * xn * xn - 0.12 * yn * yn);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
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

      // ── Scene / Camera ────────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
      camera.position.set(-1.5, 0, 12);
      camera.lookAt(2.5, 0, 0);

      // ── Tilt container + rotating orbit ──────────────────────────────
      const tilt = new THREE.Group();
      tilt.position.set(2.5, 0, 0);   // push right
      tilt.rotation.x =  0.30;         // tilt ring plane forward → scatters vertically
      tilt.rotation.z = -0.08;         // slight asymmetric lean
      scene.add(tilt);

      const orbit = new THREE.Group();
      tilt.add(orbit);

      // ── Build cards ───────────────────────────────────────────────────
      const meshes: THREE.Mesh[] = [];
      const R = 4.0;

      CARDS.forEach((card, i) => {
        const angle = (i / CARDS.length) * Math.PI * 2;
        const mesh = new THREE.Mesh(
          buildCardGeo(card.w, card.h, THREE),
          new THREE.MeshBasicMaterial({
            map: buildTexture(card, THREE),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
          })
        );

        mesh.position.set(
          Math.sin(angle) * R,
          Math.sin(angle * 2.2 + i * 0.3) * 0.6,
          Math.cos(angle) * R
        );

        // Face toward orbit centre + individual tilt
        mesh.lookAt(0, mesh.position.y, 0);
        mesh.rotation.x += card.tiltX;
        mesh.rotation.z += card.tiltZ;

        orbit.add(mesh);
        meshes.push(mesh);
      });

      // ── Mouse ─────────────────────────────────────────────────────────
      let tx = 0, ty = 0, mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth  - 0.5) * 2;
        ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      const onResize = () => {
        if (!wrap) return;
        const w = wrap.clientWidth, h = wrap.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ───────────────────────────────────────────────────
      let t = 0;
      const tmp = new THREE.Vector3();
      const camBase = { x: -1.5, y: 0 };

      const loop = () => {
        if (!alive) return;
        raf = requestAnimationFrame(loop);
        t += 0.004;

        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;

        orbit.rotation.y += 0.0032;

        meshes.forEach((mesh, i) => {
          // Gentle float per card
          mesh.position.y =
            Math.sin(t * 0.5 + i * 1.2) * 0.12 +
            Math.sin((i / CARDS.length) * Math.PI * 4) * 0.55;

          // Re-face orbit centre each frame then reapply individual tilt
          mesh.lookAt(0, mesh.position.y, 0);
          mesh.rotation.x += CARDS[i].tiltX;
          mesh.rotation.z += CARDS[i].tiltZ;

          // DoF: world Z → opacity
          mesh.getWorldPosition(tmp);
          const op = THREE.MathUtils.mapLinear(tmp.z, -R - 1, R + 1, 0.22, 1);
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.22, Math.min(1, op));
        });

        // Camera parallax
        camera.position.x += (camBase.x + mx * 1.1 - camera.position.x) * 0.04;
        camera.position.y += (camBase.y + my * 0.8 - camera.position.y) * 0.04;
        camera.lookAt(2.5, 0, 0);

        renderer.render(scene, camera);
      };

      loop();

      (wrapRef as any)._cleanup = () => {
        alive = false;
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        meshes.forEach(m => {
          m.geometry.dispose();
          (m.material as THREE.MeshBasicMaterial).map?.dispose();
          (m.material as THREE.MeshBasicMaterial).dispose();
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
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
