import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrthographicCamera, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { CYAN, NODES, moduleById, moduleHeight, type NodeId, type SceneCopy } from './sceneData';
import { Beams, CodePanels, Modules, Platform } from './SceneObjects';

interface Props {
  copy: SceneCopy;
  /** Optional external hook, e.g. to sync other UI with the selected node. */
  onSelectNode?: (id: NodeId | null) => void;
}

const NODE_IDS: NodeId[] = ['software', 'data', 'ai'];

/* ───────────── Capability checks ───────────── */

/** If WebGL context creation (or anything inside the canvas) throws, fall back to CSS. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function canRun3D(): boolean {
  try {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return false;
    if ((nav.hardwareConcurrency ?? 8) <= 2) return false;
    if ((nav.deviceMemory ?? 8) <= 2) return false;
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* ───────────── Camera fit + parallax ───────────── */

function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom = Math.min(size.width / 14.8, size.height / 10.4);
    cam.lookAt(0.25, 0.7, -0.25);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/** Eases the whole board toward the cursor (subtle tilt). */
function Parallax({ pointer, reduced, children }: { pointer: React.MutableRefObject<{ x: number; y: number }>; reduced: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent lerp
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.current.x * 0.09, k);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.current.y * 0.04, k);
  });
  return <group ref={ref}>{children}</group>;
}

/* ───────────── Callout labels: projected onto external DOM (crisp text) ───────────── */

interface CalloutRefs {
  labels: Record<NodeId, HTMLButtonElement | null>;
  lines: Record<NodeId, SVGPolylineElement | null>;
  dots: Record<NodeId, SVGCircleElement | null>;
}
type LabelRefs = React.MutableRefObject<CalloutRefs>;

/** Anchors live inside the parallax group; each frame the callout (label + leader
 *  line) is positioned in screen space and snapped to whole pixels. */
function LabelProjector({ refs }: { refs: LabelRefs }) {
  const anchors = useRef<Record<string, THREE.Object3D | null>>({});
  const v = useRef(new THREE.Vector3());
  useFrame(({ camera, size }) => {
    const k = THREE.MathUtils.clamp(size.width / 720, 0.5, 1);
    for (const id of NODE_IDS) {
      const a = anchors.current[id];
      const el = refs.current.labels[id];
      if (!a || !el) continue;
      a.getWorldPosition(v.current).project(camera);
      const x = Math.round((v.current.x * 0.5 + 0.5) * size.width);
      const y = Math.round((-v.current.y * 0.5 + 0.5) * size.height);
      const [ox, oy] = NODES[id].offset;
      const lx = Math.round(x + ox * k);
      const ly = Math.round(y + oy * k);
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      // Label sits beside the end of the leader line, away from the scene.
      const left = THREE.MathUtils.clamp(ox < 0 ? lx - w : lx, 0, Math.max(0, size.width - w));
      // Keep the callout fully inside the canvas (never under the header).
      const top = THREE.MathUtils.clamp(ly - Math.round(h / 2), 4, Math.max(4, size.height - h - 4));
      el.style.transform = `translate(${Math.round(left)}px, ${top}px)`;
      el.style.opacity = '1';
      const end = ox < 0 ? left + w : left;
      const lineY = top + Math.round(h / 2);
      const elbow = Math.round(x + (end - x) * 0.45);
      refs.current.lines[id]?.setAttribute('points', `${x},${y} ${elbow},${lineY} ${end},${lineY}`);
      refs.current.dots[id]?.setAttribute('cx', String(x));
      refs.current.dots[id]?.setAttribute('cy', String(y));
    }
  });
  return (
    <>
      {NODE_IDS.map((id) => {
        const m = moduleById(NODES[id].anchor);
        return <object3D key={id} position={[m.pos[0], moduleHeight(m) + NODES[id].y - 1, m.pos[1]]} ref={(o) => { anchors.current[id] = o; }} />;
      })}
    </>
  );
}

/* ───────────── Scene ───────────── */

function Scene({ labels, active, reduced, pointer, onHover, onSelect }: {
  labels: LabelRefs; active: NodeId | null; reduced: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  onHover: (id: NodeId | null) => void; onSelect: (id: NodeId) => void;
}) {
  // Hover/click directly on the 3D modules too.
  const bind = (id: NodeId) => ({
    onPointerOver: (e: { stopPropagation: () => void }) => { e.stopPropagation(); onHover(id); document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { onHover(null); document.body.style.cursor = ''; },
    onClick: (e: { stopPropagation: () => void }) => { e.stopPropagation(); onSelect(id); },
  });

  return (
    <>
      <OrthographicCamera makeDefault position={[20, 20, 20]} near={0.1} far={200} />
      <FitCamera />

      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 12, 4]} intensity={0.7} />
      <directionalLight position={[-6, 4, 8]} intensity={0.2} color={CYAN} />
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={0.5} color={CYAN} position={[0, 6, -8]} scale={[12, 3, 1]} />
        <Lightformer intensity={0.4} color="#ffffff" position={[-8, 4, 6]} scale={[6, 6, 1]} />
      </Environment>

      <Parallax pointer={pointer} reduced={reduced}>
        <Platform />
        <Beams reduced={reduced} />
        <Modules active={active} reduced={reduced} bind={bind} />
        <CodePanels reduced={reduced} />
        <LabelProjector refs={labels} />
      </Parallax>
    </>
  );
}

/* ───────────── Island ───────────── */

export default function HeroScene3D({ copy, onSelectNode }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const labels = useRef<CalloutRefs>({
    labels: { software: null, data: null, ai: null },
    lines: { software: null, data: null, ai: null },
    dots: { software: null, data: null, ai: null },
  });
  const reduced = usePrefersReducedMotion();
  const [enabled] = useState(canRun3D);
  const [failed, setFailed] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const [ready, setReadyState] = useState(false);
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [selected, setSelected] = useState<NodeId | null>(null);
  const active = hovered ?? selected;

  // Switch the scene root between the 3D canvas and the CSS fallback.
  const setMode = useCallback((mode: '3d' | 'css') => {
    const root = rootRef.current?.closest('[data-scene-root]');
    root?.classList.toggle('is-3d', mode === '3d');
    root?.classList.toggle('is-css', mode === 'css');
    setReadyState(mode === '3d');
  }, []);
  const setReady = useCallback((ok: boolean) => setMode(ok ? '3d' : 'css'), [setMode]);
  useEffect(() => { if (!enabled || failed) setMode('css'); }, [enabled, failed, setMode]);

  // Only fall back when FPS stays LOW (drei counts inclines as flips too).
  const declines = useRef(0);
  const onDecline = useCallback(() => {
    setDpr(1);
    declines.current += 1;
    if (declines.current >= 4) setFailed(true);
  }, []);
  const onIncline = useCallback(() => { declines.current = Math.max(0, declines.current - 1); }, []);

  // Track the cursor over the whole hero, not only the canvas.
  useEffect(() => {
    if (reduced) return;
    const hero = rootRef.current?.closest('section') ?? window;
    const onMove = (e: Event) => {
      const ev = e as PointerEvent;
      if (ev.pointerType !== 'mouse') return;
      const r = rootRef.current!.getBoundingClientRect();
      pointer.current.x = THREE.MathUtils.clamp(((ev.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp(((ev.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
    };
    const onLeave = () => { pointer.current.x = 0; pointer.current.y = 0; };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); };
  }, [reduced]);

  const select = useCallback((id: NodeId | null) => {
    setSelected((cur) => {
      const next = cur === id ? null : id;
      onSelectNode?.(next);
      return next;
    });
  }, [onSelectNode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') select(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [select]);

  // Keep the root mounted so mode switches always find the scene container.
  if (!enabled || failed) return <div ref={rootRef} className="tk-scene-3d absolute inset-0" aria-hidden="true" />;

  const detail = selected ? copy[selected] : null;

  return (
    <div ref={rootRef} className="tk-scene-3d absolute inset-0" role="img" aria-label={copy.ariaLabel}>
      <SceneBoundary onError={() => setFailed(true)}>
      <Canvas
        dpr={[1, dpr]}
        frameloop={reduced ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); setReady(true); }}
        onPointerMissed={() => select(null)}
      >
        <PerformanceMonitor bounds={() => [24, 50]} onDecline={onDecline} onIncline={onIncline}>
          <Scene labels={labels} active={active} reduced={reduced} pointer={pointer} onHover={setHovered} onSelect={select} />
        </PerformanceMonitor>
      </Canvas>
      </SceneBoundary>

      {ready && (<>

      {/* Callouts (DOM, positioned by LabelProjector) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true">
        {NODE_IDS.map((id) => (
          <g key={id} className={`tk-leader${active === id ? ' is-active' : ''}`}>
            <polyline ref={(el) => { labels.current.lines[id] = el; }} fill="none" />
            <circle ref={(el) => { labels.current.dots[id] = el; }} r="3.5" />
          </g>
        ))}
      </svg>
      {NODE_IDS.map((id) => (
        <button
          key={id}
          ref={(el) => { labels.current.labels[id] = el; }}
          type="button"
          aria-pressed={selected === id}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(id)}
          onBlur={() => setHovered(null)}
          onClick={() => select(id)}
          className={`tk-node-label${active === id ? ' is-active' : ''}`}
        >
          <span className="tk-callout-title">{copy[id].label}</span>
          <span className="tk-callout-tag">{copy[id].tag}</span>
        </button>
      ))}

      {/* Node detail (DOM, outside the canvas) */}
      <div className={`tk-node-detail${detail ? ' is-open' : ''}`} aria-live="polite">
        {detail ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-bold text-lg text-white leading-tight">{detail.title}</h3>
              <button type="button" onClick={() => select(null)} className="tk-node-close" aria-label={copy.close}>
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-sm text-muted leading-relaxed mt-2">{detail.desc}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {detail.items.map((it) => (
                <li key={it} className="font-mono text-[12px] text-white/80 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />{it}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="font-mono text-[11px] tracking-wider text-muted">{copy.hint}</p>
        )}
      </div>
      </>)}
    </div>
  );
}
