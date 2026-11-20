import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Grid, Instance, Instances, Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { BEAMS, CYAN, MODULES, getAssets, moduleHeight, pointOnPolyline, type ModuleDef, type NodeId } from './sceneData';

type V3 = [number, number, number];
const GAP = 0.06;
const DEFAULT_SIZE = 1.3;

/* ───────────── Platform ───────────── */

function roundedRectPoints(w: number, d: number, r: number, y: number) {
  const s = new THREE.Shape();
  const x0 = -w / 2, z0 = -d / 2;
  s.moveTo(x0 + r, z0);
  s.lineTo(x0 + w - r, z0); s.quadraticCurveTo(x0 + w, z0, x0 + w, z0 + r);
  s.lineTo(x0 + w, z0 + d - r); s.quadraticCurveTo(x0 + w, z0 + d, x0 + w - r, z0 + d);
  s.lineTo(x0 + r, z0 + d); s.quadraticCurveTo(x0, z0 + d, x0, z0 + d - r);
  s.lineTo(x0, z0 + r); s.quadraticCurveTo(x0, z0, x0 + r, z0);
  return s.getPoints(8).map((p) => new THREE.Vector3(p.x, y, p.y));
}

export function Platform() {
  const inner = useMemo(() => roundedRectPoints(9.2, 9.2, 0.35, 0.006), []);
  // Radial navy glow (center) fading to transparent edges — same as the CSS scene floor.
  const floorGlow = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d')!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(22, 60, 98, 0.95)');
    grad.addColorStop(0.6, 'rgba(14, 38, 64, 0.9)');
    grad.addColorStop(1, 'rgba(12, 30, 52, 0.9)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  return (
    <group>
      <RoundedBox args={[10.2, 0.3, 10.2]} radius={0.12} smoothness={3} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#0B1A2E" roughness={0.7} metalness={0.2} emissive="#0C2240" emissiveIntensity={0.35} />
        <Edges threshold={15} color={CYAN} transparent opacity={0.45} />
      </RoundedBox>
      <mesh position={[0, 0.002, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={floorGlow} transparent depthWrite={false} />
      </mesh>
      <Grid
        position={[0, 0.004, 0]}
        args={[9.8, 9.8]}
        cellSize={0.45}
        cellThickness={0.5}
        cellColor="#133454"
        sectionSize={2.25}
        sectionThickness={0.8}
        sectionColor="#1B4A70"
        fadeDistance={60}
        followCamera={false}
        infiniteGrid={false}
      />
      <Line points={inner} color={CYAN} lineWidth={1} transparent opacity={0.12} />
    </group>
  );
}

/* ───────────── Server modules ───────────── */

function Emitter({ y, reduced, children }: { y: number; reduced: boolean; children?: React.ReactNode }) {
  const a = getAssets();
  const holo = useRef<THREE.Group>(null);
  const holoEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.2, 0)), []);
  useFrame(({ clock }) => {
    if (!holo.current || reduced) return;
    holo.current.rotation.y = clock.elapsedTime * 0.8;
    holo.current.position.y = 0.78 + Math.sin(clock.elapsedTime * 1.4) * 0.05;
  });
  return (
    <group position={[0, y, 0]}>
      {/* pad + light disc */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.06, 40]} />
        <meshPhysicalMaterial color="#0B1828" roughness={0.2} clearcoat={1} transparent opacity={0.65} depthWrite={false} emissive={CYAN} emissiveIntensity={0.06} />
      </mesh>
      <mesh position={[0, 0.065, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.36, 40]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.07, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.42, 0.47, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
      </mesh>
      {/* light cone */}
      <mesh position={[0, 0.6, 0]} material={a.cone}>
        <cylinderGeometry args={[0.2, 0.38, 1.1, 32, 1, true]} />
      </mesh>
      {/* hologram */}
      <group ref={holo} position={[0, 0.78, 0]}>
        <lineSegments geometry={holoEdges}>
          <lineBasicMaterial color="#BAE6FD" transparent opacity={0.95} />
        </lineSegments>
      </group>
      {children}
      <pointLight color={CYAN} intensity={1.6} distance={2.2} position={[0, 0.5, 0]} />
    </group>
  );
}

function Module({ def, active, reduced }: { def: ModuleDef; active: boolean; reduced: boolean }) {
  const a = getAssets();
  const s = def.size ?? DEFAULT_SIZE;
  const H = moduleHeight(def);
  const edgeMat = active ? a.edgeActive : a.edge;

  let y = 0;
  const tiers = def.tiers.map((h) => {
    const t = { y: y + h / 2, h };
    y += h + GAP;
    return t;
  });

  return (
    <group position={[def.pos[0], 0, def.pos[1]]}>
      {tiers.map((t, i) => (
        <mesh key={i} geometry={a.box} material={a.body} position={[0, t.y, 0]} scale={[s, t.h, s]}>
          <lineSegments geometry={a.boxEdges} material={edgeMat} />
        </mesh>
      ))}

      {/* recessed violet panel on top */}
      {def.inset && (
        <group position={[0, H + 0.004, 0]} rotation-x={-Math.PI / 2}>
          <mesh geometry={a.plane} material={a.inset} scale={s * 0.66} />
          <lineSegments geometry={a.planeEdges} material={a.insetEdge} scale={s * 0.66} />
          <lineSegments geometry={a.planeEdges} material={a.insetEdge} scale={s * 0.8} />
        </group>
      )}

      {/* software cube: glowing chip on the front face */}
      {def.kind === 'cube' && !def.emitter && (
        <group position={[0, H * 0.5, s / 2 + 0.004]}>
          <mesh geometry={a.plane} material={a.glow} scale={0.34} />
          <lineSegments geometry={a.planeEdges} material={a.edge} scale={0.5} />
        </group>
      )}

      {/* deploy module: lit top + violet base pad */}
      {def.kind === 'deploy' && (
        <>
          <mesh geometry={a.plane} material={a.glow} position={[0, H + 0.004, 0]} rotation-x={-Math.PI / 2} scale={s * 0.7} />
          <group position={[0, 0.006, 0]} rotation-x={-Math.PI / 2}>
            <mesh geometry={a.plane} material={a.clamp} scale={s * 1.6} />
            <lineSegments geometry={a.planeEdges} material={a.clampEdge} scale={s * 1.6} />
          </group>
        </>
      )}

      {def.emitter && (
        <Emitter y={H} reduced={reduced}>
          {/* Reserved mount point for the animated 3D Teko mascot (separate work plan). */}
          {def.id === 'G' && <group name="teko-slot" position={[0, 0.07, 0]} />}
        </Emitter>
      )}
    </group>
  );
}

/** Rack slots + status LEDs on the two camera-facing faces (+x, +z), batched. */
function RackDetails() {
  const { slots, leds } = useMemo(() => {
    const slots: { p: V3; s: V3 }[] = [];
    const leds: { p: V3; s: V3 }[] = [];
    MODULES.filter((m) => m.kind === 'stack').forEach((m) => {
      const s = m.size ?? DEFAULT_SIZE;
      const [mx, mz] = m.pos;
      let y = 0;
      m.tiers.forEach((h) => {
        [0.38, 0.62].forEach((f) => {
          slots.push({ p: [mx - 0.08 * s, y + h * f, mz + s / 2 + 0.004], s: [s * 0.62, 0.028, 0.002] });
          slots.push({ p: [mx + s / 2 + 0.004, y + h * f, mz + 0.08 * s], s: [0.002, 0.028, s * 0.62] });
        });
        leds.push({ p: [mx + s * 0.36, y + h * 0.5, mz + s / 2 + 0.005], s: [0.07, 0.07, 0.002] });
        leds.push({ p: [mx + s / 2 + 0.005, y + h * 0.5, mz - s * 0.36], s: [0.002, 0.07, 0.07] });
        y += h + GAP;
      });
    });
    return { slots, leds };
  }, []);
  const a = getAssets();
  return (
    <>
      <Instances limit={slots.length} geometry={a.box} material={a.slot}>
        {slots.map((x, i) => <Instance key={i} position={x.p} scale={x.s} />)}
      </Instances>
      <Instances limit={leds.length} geometry={a.box} material={a.led}>
        {leds.map((x, i) => <Instance key={i} position={x.p} scale={x.s} />)}
      </Instances>
    </>
  );
}

type Bind = (id: NodeId) => Record<string, unknown>;

export function Modules({ active, reduced, bind }: { active: NodeId | null; reduced: boolean; bind?: Bind }) {
  return (
    <>
      {MODULES.map((m) => (
        <group key={m.id} {...(bind ? bind(m.node) : {})}>
          <Module def={m} active={active === m.node} reduced={reduced} />
        </group>
      ))}
      <RackDetails />
    </>
  );
}

/* ───────────── Data tubes ───────────── */

const BEAM_Y = 0.16;

function Beam({ points, speed, reduced }: { points: [number, number][]; speed: number; reduced: boolean }) {
  const a = getAssets();
  const pts = useMemo(() => points.map(([x, z]) => new THREE.Vector3(x, BEAM_Y, z)), [points]);
  const segs = useMemo(() => pts.slice(1).map((p, i) => {
    const q = pts[i];
    const len = p.distanceTo(q);
    const alongX = Math.abs(p.x - q.x) > Math.abs(p.z - q.z);
    return { mid: new THREE.Vector3().addVectors(p, q).multiplyScalar(0.5), len, alongX };
  }), [pts]);
  const { lengths, total } = useMemo(() => {
    const l = segs.map((s) => s.len);
    return { lengths: l, total: l.reduce((x, y) => x + y, 0) };
  }, [segs]);

  const dash = useRef<any>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, dt) => {
    if (reduced) return;
    if (dash.current?.material) dash.current.material.dashOffset -= dt * 0.9;
    pulses.current.forEach((m, i) => {
      if (!m) return;
      pointOnPolyline(pts, lengths, total, (clock.elapsedTime * speed + i * 0.5) % 1, tmp);
      m.position.copy(tmp);
    });
  });

  return (
    <group>
      {segs.map((s, i) => (
        <group key={i}>
          {/* translucent tube */}
          <mesh geometry={a.box} material={a.beam} position={s.mid} scale={s.alongX ? [s.len, 0.2, 0.4] : [0.4, 0.2, s.len]}>
            <lineSegments geometry={a.boxEdges} material={a.beamEdge} />
          </mesh>
          {/* violet clamp in the middle of long runs */}
          {s.len > 1.4 && (
            <mesh geometry={a.box} material={a.clamp} position={s.mid} scale={s.alongX ? [0.42, 0.28, 0.5] : [0.5, 0.28, 0.42]}>
              <lineSegments geometry={a.boxEdges} material={a.clampEdge} />
            </mesh>
          )}
        </group>
      ))}
      <Line ref={dash} points={pts} color={CYAN} lineWidth={1.4} dashed dashSize={0.18} gapSize={0.22} transparent opacity={0.9} />
      {!reduced && [0, 1].map((i) => (
        <mesh key={i} ref={(m) => { pulses.current[i] = m; }} geometry={a.pulse} material={a.pulseMat} />
      ))}
    </group>
  );
}

export function Beams({ reduced }: { reduced: boolean }) {
  return <>{BEAMS.map((b, i) => <Beam key={i} {...b} reduced={reduced} />)}</>;
}

/* ───────────── Floating code panels (geometry, no baked text) ───────────── */

type Token = [number, string];
const CODE: Token[][] = [
  [[0.35, '#7DD3FC'], [0.55, CYAN], [0.2, '#E2E8F0']],
  [[0.2, '#475569'], [0.45, '#E2E8F0'], [0.4, '#BAE6FD']],
  [[0.2, '#475569'], [0.3, CYAN], [0.6, '#E2E8F0']],
  [[0.4, '#475569'], [0.5, '#93C5FD'], [0.25, '#BAE6FD']],
  [[0.2, '#475569'], [0.7, '#E2E8F0']],
  [[0.12, '#7DD3FC']],
];
const TERM: Token[][] = [
  [[0.3, '#7DD3FC'], [0.5, CYAN]],
  [[0.2, '#475569'], [0.8, '#E2E8F0']],
  [[0.2, '#475569'], [0.4, '#93C5FD'], [0.35, '#E2E8F0']],
  [[0.12, CYAN]],
];

function CodePanel({ position, size, code, reduced, phase = 0 }: { position: V3; size: [number, number]; code: Token[][]; reduced: boolean; phase?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + phase) * 0.06;
  });
  const [w, h] = size;
  const bars = useMemo(() => {
    const out: { p: V3; w: number; c: string }[] = [];
    const step = (h - 0.45) / Math.max(1, code.length - 1);
    code.forEach((line, r) => {
      const y = h / 2 - 0.32 - r * step;
      out.push({ p: [-w / 2 + 0.2, y, 0.03], w: 0.1, c: '#334155' }); // line number
      let x = -w / 2 + 0.38;
      line.forEach(([tw, c]) => {
        out.push({ p: [x + tw / 2, y, 0.03], w: tw, c });
        x += tw + 0.08;
      });
    });
    return out;
  }, [code, w, h]);
  return (
    <group ref={ref} position={position} rotation-y={Math.PI / 4}>
      <RoundedBox args={[w, h, 0.04]} radius={0.04} smoothness={2}>
        <meshPhysicalMaterial color="#0B1828" transparent opacity={0.72} roughness={0.2} clearcoat={1} depthWrite={false} emissive={CYAN} emissiveIntensity={0.03} />
        <Edges threshold={25} color={CYAN} transparent opacity={0.45} />
      </RoundedBox>
      <Instances limit={bars.length}>
        <planeGeometry args={[1, 0.05]} />
        <meshBasicMaterial transparent opacity={0.9} />
        {bars.map((b, i) => <Instance key={i} position={b.p} scale={[b.w, 1, 1]} color={b.c} />)}
      </Instances>
    </group>
  );
}

export function CodePanels({ reduced }: { reduced: boolean }) {
  return (
    <>
      <CodePanel position={[-6.0, 2.5, 0.9]} size={[3.3, 2.1]} code={CODE} reduced={reduced} />
      <CodePanel position={[-1.6, 1.0, 5.9]} size={[2.9, 1.5]} code={TERM} reduced={reduced} phase={1.8} />
    </>
  );
}
