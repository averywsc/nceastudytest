"use client";
import { useEffect, useRef, useState } from "react";
const TAU = Math.PI * 2, norm = (p: number) => ((p % TAU) + TAU) % TAU;
const W = 300, H = 56;
export default function SHMDiagram() {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = useRef(0);
  useEffect(() => { // reduced motion: stay paused
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing) return;
    let id = 0; last.current = performance.now();
    const tick = (t: number) => { setPhase(p => norm(p + ((t - last.current) / 1000) * 1.5)); last.current = t; id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [playing]);
  const x = Math.cos(phase), v = -Math.sin(phase), a = -Math.cos(phase);
  const scrubCircle = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons === 0 && e.type !== "pointerdown") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 140 - 70, py = ((e.clientY - r.top) / r.height) * 140 - 70;
    setPlaying(false); setPhase(norm(Math.atan2(-py, px)));
  };
  const scrubGraph = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons === 0 && e.type !== "pointerdown") return;
    const r = e.currentTarget.getBoundingClientRect();
    setPlaying(false); setPhase(norm(((e.clientX - r.left) / r.width) * TAU));
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); setPlaying(false); setPhase(p => norm(p + 0.1)); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); setPlaying(false); setPhase(p => norm(p - 0.1)); }
  };
  const curve = (f: (p: number) => number) => Array.from({ length: 61 }, (_, i) => { const p = (i / 60) * TAU; return `${i ? "L" : "M"}${(p / TAU) * W},${H / 2 - f(p) * (H / 2 - 4)}`; }).join("");
  const graphs: [string, (p: number) => number][] = [["Displacement", Math.cos], ["Velocity", p => -Math.sin(p)], ["Acceleration", p => -Math.cos(p)]];
  const desc = `Phase ${(phase * 180 / Math.PI).toFixed(0)} degrees. Displacement ${x.toFixed(2)} A, velocity ${v.toFixed(2)} A omega, acceleration ${a.toFixed(2)} A omega squared.`;
  return (
    <div tabIndex={0} onKeyDown={key} role="group" aria-label="Simple harmonic motion diagram. Arrow keys scrub, space plays or pauses." className="rounded border p-3 my-4">
      <div className="flex gap-4 flex-wrap">
        <svg viewBox="-70 -70 140 140" width={140} height={140} className="touch-none" onPointerDown={scrubCircle} onPointerMove={scrubCircle} role="img" aria-label="Reference circle with a draggable point">
          <circle r={50} fill="none" stroke="currentColor" />
          <line x1={0} y1={0} x2={50 * x} y2={-50 * Math.sin(phase)} stroke="#1f7a5c" />
          <circle cx={50 * x} cy={-50 * Math.sin(phase)} r={7} fill="#f2a900" />
        </svg>
        <svg viewBox="-30 0 160 110" width={140} height={110} role="img" aria-label="Pendulum swinging in time with the phase">
          <g transform={`rotate(${x * 25} 50 5)`}><line x1={50} y1={5} x2={50} y2={85} stroke="currentColor" /><circle cx={50} cy={90} r={10} fill="#1f7a5c" /></g>
        </svg>
        <div className="grow min-w-[240px]">
          {graphs.map(([n, f]) => (
            <svg key={n} viewBox={`0 0 ${W} ${H}`} className="w-full touch-none" onPointerDown={scrubGraph} onPointerMove={scrubGraph} role="img" aria-label={`${n} graph against phase`}>
              <path d={curve(f)} fill="none" stroke="currentColor" />
              <line x1={(phase / TAU) * W} x2={(phase / TAU) * W} y1={0} y2={H} stroke="#f2a900" strokeWidth={2} />
            </svg>))}
        </div>
      </div>
      <button className="mt-2 px-3 py-1 bg-leaf text-white rounded" onClick={() => setPlaying(p => !p)}>{playing ? "Pause" : "Play"}</button>
      <p className="mt-2 text-sm" aria-live="polite">{desc}</p>
    </div>
  );
}
