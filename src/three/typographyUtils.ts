import * as THREE from 'three';

/**
 * Samples pixel points from any rendered text string using an offscreen canvas.
 * Returns an array of [x, y, z] coordinates centered around (0,0,0).
 */
export function sampleTextParticles(
  text: string,
  options: {
    fontSize?: number;
    density?: number;
    scale?: number;
    depth?: number;
    depthLayers?: number;
    fontFamily?: string;
  } = {}
): Float32Array {
  const fontSize = options.fontSize ?? 80;
  const density = options.density ?? 3;
  const scale = options.scale ?? 0.05;
  const depth = options.depth ?? 0.8;
  const depthLayers = options.depthLayers ?? 3;
  const fontFamily = options.fontFamily ?? "'JetBrains Mono', 'Inter', monospace";

  // Create offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 300;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return new Float32Array(0);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  const points: number[] = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let y = 0; y < canvas.height; y += density) {
    for (let x = 0; x < canvas.width; x += density) {
      const idx = (y * canvas.width + x) * 4;
      if (data[idx] > 140) { // bright pixel
        const px = (x - centerX) * scale;
        const py = -(y - centerY) * scale;

        // Create 3D extruded depth layers
        for (let l = 0; l < depthLayers; l++) {
          const pz = ((l / (depthLayers - 1 || 1)) - 0.5) * depth;
          points.push(px, py, pz);
        }
      }
    }
  }

  return new Float32Array(points);
}

/**
 * Creates high-resolution canvas texture for 3D metallic/glass typography panels
 */
export function createTextTexture(
  text: string,
  options: {
    fontSize?: number;
    color?: string;
    subText?: string;
    subColor?: string;
    glowColor?: string;
    width?: number;
    height?: number;
  } = {}
): THREE.CanvasTexture {
  const width = options.width ?? 1024;
  const height = options.height ?? 256;
  const fontSize = options.fontSize ?? 110;
  const color = options.color ?? '#ffffff';
  const subText = options.subText ?? '';
  const subColor = options.subColor ?? '#93c5fd';
  const glowColor = options.glowColor ?? '#3b82f6';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, width, height);

    // Neon glow blur
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 24;

    ctx.fillStyle = color;
    ctx.font = `900 ${fontSize}px 'JetBrains Mono', 'Inter', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const yOffset = subText ? height / 2 - 20 : height / 2;
    ctx.fillText(text, width / 2, yOffset);

    if (subText) {
      ctx.shadowBlur = 10;
      ctx.font = `600 ${fontSize * 0.32}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = subColor;
      ctx.fillText(subText, width / 2, height / 2 + 50);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates human silhouette particles for Harish in the About section
 */
export function generateHumanSilhouetteParticles(count: number = 380): Float32Array {
  const positions = new Float32Array(count * 3);
  let pIdx = 0;

  // Head (Sphere)
  const headCount = Math.floor(count * 0.2);
  for (let i = 0; i < headCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 0.9;
    const sinPhi = Math.sin(phi);

    positions[pIdx++] = r * sinPhi * Math.cos(theta);
    positions[pIdx++] = 2.6 + r * Math.cos(phi);
    positions[pIdx++] = r * sinPhi * Math.sin(theta) * 0.8;
  }

  // Torso & Shoulders
  const torsoCount = Math.floor(count * 0.45);
  for (let i = 0; i < torsoCount; i++) {
    const yNorm = Math.random(); // 0 to 1
    const y = 0.5 + yNorm * 1.6;
    const shoulderWidth = 1.8 - yNorm * 0.6;
    const x = (Math.random() - 0.5) * shoulderWidth * 2;
    const z = (Math.random() - 0.5) * 0.8;

    positions[pIdx++] = x;
    positions[pIdx++] = y;
    positions[pIdx++] = z;
  }

  // Arms & Lower Body
  while (pIdx < count * 3) {
    const isLeft = Math.random() > 0.5;
    const limb = Math.random();
    if (limb > 0.5) {
      // Arms
      const armProg = Math.random();
      positions[pIdx++] = (isLeft ? -1.2 : 1.2) - (isLeft ? 0.3 : -0.3) * armProg;
      positions[pIdx++] = 1.9 - armProg * 1.6;
      positions[pIdx++] = (Math.random() - 0.5) * 0.5;
    } else {
      // Base / desk presence
      positions[pIdx++] = (Math.random() - 0.5) * 2.4;
      positions[pIdx++] = -0.2 - Math.random() * 0.8;
      positions[pIdx++] = (Math.random() - 0.5) * 1.2;
    }
  }

  return positions;
}
