export type SceneAct = 
  | 'hero'          // 0.00 - 0.12
  | 'about'         // 0.12 - 0.24
  | 'skills'        // 0.24 - 0.40
  | 'projects'      // 0.40 - 0.56
  | 'letterTunnel'  // 0.56 - 0.66
  | 'education'     // 0.66 - 0.76
  | 'dsa'           // 0.76 - 0.86
  | 'certification' // 0.86 - 0.93
  | 'contact';      // 0.93 - 1.00

export interface CameraWaypoint {
  pos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface ParticleParticle {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  vx: number;
  vy: number;
  vz: number;
  colorR: number;
  colorG: number;
  colorB: number;
  size: number;
  alpha: number;
}
