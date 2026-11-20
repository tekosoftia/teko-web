import * as THREE from 'three';

export const CYAN = '#38BDF8';
export const VIOLET = '#7DD3FC'; // secondary accent: soft sky (no violet)
export const SURFACE = '#0E1626';
export const DARK = '#0A1120';

export type NodeId = 'software' | 'data' | 'ai';

export interface NodeCopy {
  label: string;
  tag: string;
  title: string;
  desc: string;
  items: string[];
}

export type SceneCopy = Record<NodeId, NodeCopy> & { hint: string; close: string; ariaLabel: string };

/*
 * World layout (orthographic iso camera at +x +y +z):
 *   screen-left ≈ (-x, +z)   screen-right ≈ (+x, -z)
 *   screen-top  ≈ (-x, -z)   screen-bottom ≈ (+x, +z)
 */

export type ModuleKind = 'stack' | 'cube' | 'deploy';

export interface ModuleDef {
  id: string;
  node: NodeId;
  kind: ModuleKind;
  pos: [number, number];
  /** Tier heights for stacks; single height for cubes. */
  tiers: number[];
  inset?: boolean;
  emitter?: boolean;
  size?: number;
}

export const MODULES: ModuleDef[] = [
  // Datos e Infraestructura — top-left / top
  { id: 'B', node: 'data', kind: 'stack', pos: [-2.9, 0], tiers: [0.5, 0.5, 0.5], inset: true },
  { id: 'C', node: 'data', kind: 'stack', pos: [-2.4, -2.0], tiers: [0.32, 0.32], inset: true, size: 1.2 },
  { id: 'D', node: 'data', kind: 'stack', pos: [-1.0, -3.5], tiers: [0.45, 0.45, 0.45], emitter: true },
  // IA y Automatización — center / right
  { id: 'G', node: 'ai', kind: 'cube', pos: [0, 0], tiers: [0.7], emitter: true, size: 1.4 },
  { id: 'E', node: 'ai', kind: 'stack', pos: [1.6, -3.3], tiers: [0.45, 0.45, 0.45], inset: true },
  { id: 'H', node: 'ai', kind: 'stack', pos: [3.0, -1.4], tiers: [0.45, 0.45, 0.45], inset: true },
  { id: 'K', node: 'ai', kind: 'stack', pos: [2.5, 0.6], tiers: [0.45, 0.45], emitter: true },
  // Software — left / bottom
  { id: 'F', node: 'software', kind: 'cube', pos: [-2.9, 2.7], tiers: [1.0], size: 1.4 },
  { id: 'I', node: 'software', kind: 'stack', pos: [-0.3, 3.3], tiers: [0.45, 0.45], emitter: true },
  { id: 'J', node: 'software', kind: 'deploy', pos: [1.5, 2.3], tiers: [0.6], size: 0.9 },
];

/** Which module anchors each callout label, and where the label sits (px offset). */
export const NODES: Record<NodeId, { anchor: string; y: number; offset: [number, number] }> = {
  software: { anchor: 'F', y: 1.3, offset: [-90, 195] },
  data:     { anchor: 'B', y: 1.9, offset: [110, -125] },
  ai:       { anchor: 'H', y: 1.7, offset: [105, -105] },
};

/** Axis-aligned data "tubes" between modules (x, z). Everything converges on the AI core. */
export const BEAMS: { points: [number, number][]; speed: number }[] = [
  { points: [[-2.9, 2.7], [-1.3, 2.7], [-1.3, 0], [0, 0]], speed: 0.16 },   // Software → IA
  { points: [[-2.9, 0], [0, 0]], speed: 0.2 },                               // Datos → IA
  { points: [[-2.4, -2.0], [-1.0, -2.0], [-1.0, -3.5]], speed: 0.22 },       // Datos internal
  { points: [[-1.0, -3.5], [1.6, -3.5], [1.6, -3.3]], speed: 0.2 },          // Datos → IA
  { points: [[0, 0], [0, -1.4], [3.0, -1.4]], speed: 0.18 },                 // IA internal
  { points: [[0, 0], [2.5, 0], [2.5, 0.6]], speed: 0.24 },
  { points: [[-2.9, 2.7], [-2.9, 3.3], [-0.3, 3.3]], speed: 0.22 },          // Software internal
  { points: [[-0.3, 3.3], [1.5, 3.3], [1.5, 2.3]], speed: 0.2 },
];

/* ───────────── Shared resources (created once) ───────────── */

let assets: ReturnType<typeof createAssets> | null = null;

function createAssets() {
  const box = new THREE.BoxGeometry(1, 1, 1);
  const boxEdges = new THREE.EdgesGeometry(box);
  const plane = new THREE.PlaneGeometry(1, 1);
  const planeEdges = new THREE.EdgesGeometry(plane);
  const pulse = new THREE.SphereGeometry(0.06, 12, 12);

  // Dark translucent glass: faces let the inner edges, slots and flows show through.
  const body = new THREE.MeshPhysicalMaterial({
    color: '#0B1828', roughness: 0.2, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.3,
    transparent: true, opacity: 0.6, depthWrite: false,
    emissive: new THREE.Color(CYAN), emissiveIntensity: 0.035,
  });
  const edge = new THREE.LineBasicMaterial({ color: '#7DD3FC', transparent: true, opacity: 0.5 });
  const edgeActive = new THREE.LineBasicMaterial({ color: '#BAE6FD', transparent: true, opacity: 1 });
  const slot = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.45, depthWrite: false });
  const led = new THREE.MeshBasicMaterial({ color: CYAN });
  const inset = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.16, depthWrite: false });
  const insetEdge = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.8 });
  const beam = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.1, depthWrite: false });
  const beamEdge = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.22 });
  const clamp = new THREE.MeshBasicMaterial({ color: '#0E2A44', transparent: true, opacity: 0.6, depthWrite: false });
  const clampEdge = new THREE.LineBasicMaterial({ color: '#7DD3FC', transparent: true, opacity: 0.5 });
  const pulseMat = new THREE.MeshBasicMaterial({ color: '#E0F2FE' });
  const glow = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.4, depthWrite: false });
  const cone = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });

  return { box, boxEdges, plane, planeEdges, pulse, body, edge, edgeActive, slot, led, inset, insetEdge, beam, beamEdge, clamp, clampEdge, pulseMat, glow, cone };
}

export function getAssets() {
  if (!assets) assets = createAssets();
  return assets;
}

export function moduleById(id: string) {
  return MODULES.find((m) => m.id === id)!;
}

export function moduleHeight(m: ModuleDef) {
  const gap = 0.06;
  return m.tiers.reduce((s, h) => s + h, 0) + gap * (m.tiers.length - 1);
}

/** Point at normalized distance t (0..1) along a polyline. */
export function pointOnPolyline(pts: THREE.Vector3[], lengths: number[], total: number, t: number, out: THREE.Vector3) {
  let d = t * total;
  for (let i = 0; i < lengths.length; i++) {
    if (d <= lengths[i] || i === lengths.length - 1) {
      return out.lerpVectors(pts[i], pts[i + 1], lengths[i] ? Math.min(1, d / lengths[i]) : 0);
    }
    d -= lengths[i];
  }
  return out.copy(pts[pts.length - 1]);
}
