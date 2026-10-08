import * as THREE from 'three';
import { sampleTextParticles, createTextTexture, generateHumanSilhouetteParticles } from './typographyUtils';

export class CinematicEngine {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;

  // Interaction & Scroll State
  private scrollProgress: number = 0;
  private targetScrollProgress: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;
  private animationFrameId: number | null = null;
  private isDestroyed: boolean = false;

  // Scene Groups
  private rootGroup: THREE.Group;
  private heroGroup: THREE.Group;
  private aboutGroup: THREE.Group;
  private skillsGroup: THREE.Group;
  private projectsGroup: THREE.Group;
  private tunnelGroup: THREE.Group;
  private educationGroup: THREE.Group;
  private dsaGroup: THREE.Group;
  private certGroup: THREE.Group;
  private contactGroup: THREE.Group;

  // Ambient Starfield & Cursor particles
  private starfield: THREE.Points;
  private cursorTrail: THREE.Points;
  private cursorPositions: Float32Array;
  private cursorIdx: number = 0;

  // Act-specific references
  private heroParticleMesh!: THREE.Points;
  private heroParticlesBase!: Float32Array;
  private heroParticlesCurrent!: Float32Array;
  private heroMeshBanner!: THREE.Mesh;

  private aboutSilhouetteMesh!: THREE.Points;
  private aboutWordsGroup!: THREE.Group;

  private skillsOrbitGroup!: THREE.Group;
  private skillsCenterMesh!: THREE.Mesh;
  private skillsTechObjects: THREE.Object3D[] = [];

  private hospitalGroup!: THREE.Group;
  private ecommerceGroup!: THREE.Group;
  private cartMesh!: THREE.Mesh;

  private tunnelWords: THREE.Mesh[] = [];

  private eduNumbersGroup!: THREE.Group;

  private dsaNodesGroup!: THREE.Group;
  private dsaCodeWall!: THREE.Group;

  private certDoorLeft!: THREE.Mesh;
  private certDoorRight!: THREE.Mesh;
  private certInnerBadge!: THREE.Mesh;

  private contactSphere!: THREE.Mesh;
  private contactTextBanner!: THREE.Mesh;
  private finalHRMesh!: THREE.Mesh;

  // Lights
  private blueLight!: THREE.PointLight;
  private purpleLight!: THREE.PointLight;
  private dirLight!: THREE.DirectionalLight;

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    // 1. Scene setup with deep cinematic atmospheric fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06080e, 0.022);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 24);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    this.blueLight = new THREE.PointLight(0x3b82f6, 4.5, 60);
    this.blueLight.position.set(12, 8, 15);
    this.scene.add(this.blueLight);

    this.purpleLight = new THREE.PointLight(0xa855f7, 4.5, 60);
    this.purpleLight.position.set(-12, -8, 15);
    this.scene.add(this.purpleLight);

    this.dirLight = new THREE.DirectionalLight(0xe0e7ff, 1.8);
    this.dirLight.position.set(0, 20, 20);
    this.scene.add(this.dirLight);

    // 5. Root Group
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    // Individual Act Groups
    this.heroGroup = new THREE.Group();
    this.aboutGroup = new THREE.Group();
    this.skillsGroup = new THREE.Group();
    this.projectsGroup = new THREE.Group();
    this.tunnelGroup = new THREE.Group();
    this.educationGroup = new THREE.Group();
    this.dsaGroup = new THREE.Group();
    this.certGroup = new THREE.Group();
    this.contactGroup = new THREE.Group();

    this.rootGroup.add(
      this.heroGroup,
      this.aboutGroup,
      this.skillsGroup,
      this.projectsGroup,
      this.tunnelGroup,
      this.educationGroup,
      this.dsaGroup,
      this.certGroup,
      this.contactGroup
    );

    // Setup global background & cursor systems
    this.starfield = this.createStarfield();
    this.scene.add(this.starfield);

    const { trail, positions } = this.createCursorTrail();
    this.cursorTrail = trail;
    this.cursorPositions = positions;
    this.scene.add(this.cursorTrail);

    // Build the 9 3D Cinematic Acts
    this.buildHeroAct();
    this.buildAboutAct();
    this.buildSkillsAct();
    this.buildProjectsAct();
    this.buildLetterTunnelAct();
    this.buildEducationAct();
    this.buildDSAAct();
    this.buildCertAct();
    this.buildContactAct();

    // Event Listeners
    this.setupEvents();

    // Start loop
    this.animate();
  }

  // ==========================================
  // BACKGROUND PARTICLES & CURSOR TRAIL
  // ==========================================
  private createStarfield(): THREE.Points {
    const count = 550;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color(0x60a5fa);
    const colorB = new THREE.Color(0xc084fc);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const c = Math.random() > 0.5 ? colorA : colorB;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geo, mat);
  }

  private createCursorTrail(): { trail: THREE.Points; positions: Float32Array } {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = 9999;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.28,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    return { trail: new THREE.Points(geo, mat), positions };
  }

  // ==========================================
  // ACT 0: HERO — "HARISH R"
  // ==========================================
  private buildHeroAct(): void {
    // 3D Particle Text for HARISH R
    const sampled = sampleTextParticles('HARISH R', {
      fontSize: 88,
      density: 3,
      scale: 0.052,
      depth: 1.0,
      depthLayers: 3,
    });

    this.heroParticlesBase = new Float32Array(sampled);
    this.heroParticlesCurrent = new Float32Array(sampled);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.heroParticlesCurrent, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    this.heroParticleMesh = new THREE.Points(geo, mat);
    this.heroParticleMesh.position.set(0, 1.2, 0);
    this.heroGroup.add(this.heroParticleMesh);

    // Glowing 3D Subtitle Panel
    const subtitleTex = createTextTexture('JAVA FULL STACK DEVELOPER', {
      fontSize: 58,
      color: '#c084fc',
      glowColor: '#9333ea',
      width: 1024,
      height: 128,
    });

    const bannerGeo = new THREE.PlaneGeometry(12, 1.5);
    const bannerMat = new THREE.MeshBasicMaterial({
      map: subtitleTex,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    this.heroMeshBanner = new THREE.Mesh(bannerGeo, bannerMat);
    this.heroMeshBanner.position.set(0, -1.8, 0.4);
    this.heroGroup.add(this.heroMeshBanner);
  }

  // ==========================================
  // ACT 1: ABOUT — "WHO AM I?" & "DEVELOPER"
  // ==========================================
  private buildAboutAct(): void {
    this.aboutGroup.position.set(0, -40, -15);

    // Human silhouette particle cloud representing Harish
    const silPositions = generateHumanSilhouetteParticles(450);
    const silGeo = new THREE.BufferGeometry();
    silGeo.setAttribute('position', new THREE.BufferAttribute(silPositions, 3));

    const silMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    this.aboutSilhouetteMesh = new THREE.Points(silGeo, silMat);
    this.aboutSilhouetteMesh.position.set(0, -0.5, 0);
    this.aboutGroup.add(this.aboutSilhouetteMesh);

    // Dynamic 3D Words: LEARN, BUILD, SOLVE, CREATE colliding into DEVELOPER
    this.aboutWordsGroup = new THREE.Group();
    const words = [
      { text: 'LEARN', color: '#60a5fa', pos: [-5, 3.5, -2] },
      { text: 'BUILD', color: '#e2e8f0', pos: [5, 3.5, -2] },
      { text: 'SOLVE', color: '#fbbf24', pos: [-5, -3.5, -2] },
      { text: 'CREATE', color: '#c084fc', pos: [5, -3.5, -2] },
    ];

    words.forEach(w => {
      const tex = createTextTexture(w.text, { fontSize: 72, color: w.color });
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 1.8),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85 })
      );
      mesh.position.set(w.pos[0], w.pos[1], w.pos[2]);
      this.aboutWordsGroup.add(mesh);
    });

    // Centered "DEVELOPER" emerging
    const devTex = createTextTexture('DEVELOPER', {
      fontSize: 100,
      color: '#ffffff',
      subText: 'D:Java  E:Python  V:Spring  E:MySQL  L:JS  O:HTML  P:CSS  E:Git  R:DSA',
      subColor: '#60a5fa',
      glowColor: '#3b82f6',
      height: 256,
    });
    const devMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 4),
      new THREE.MeshBasicMaterial({ map: devTex, transparent: true, opacity: 0.95 })
    );
    devMesh.position.set(0, 0, 1.5);
    devMesh.name = 'developerBanner';
    this.aboutWordsGroup.add(devMesh);

    this.aboutGroup.add(this.aboutWordsGroup);
  }

  // ==========================================
  // ACT 2: SKILLS — "TECHNOLOGY UNIVERSE"
  // ==========================================
  private buildSkillsAct(): void {
    this.skillsGroup.position.set(0, -85, -20);

    // Center "SKILLS" core
    const skillsTex = createTextTexture('SKILLS', {
      fontSize: 110,
      color: '#ffffff',
      glowColor: '#8b5cf6',
    });
    this.skillsCenterMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 2.5),
      new THREE.MeshBasicMaterial({ map: skillsTex, transparent: true, opacity: 0.95 })
    );
    this.skillsGroup.add(this.skillsCenterMesh);

    // Orbiting 3D Tech Objects
    this.skillsOrbitGroup = new THREE.Group();
    this.skillsGroup.add(this.skillsOrbitGroup);

    // 1. Java: 3D Diamond / Polyhedron Symbol
    const javaMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.2, wireframe: true })
    );
    javaMesh.position.set(8, 0, 0);
    this.skillsOrbitGroup.add(javaMesh);
    this.skillsTechObjects.push(javaMesh);

    // 2. MySQL: 3D Database Cylinder
    const mysqlMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.7, roughness: 0.3, wireframe: true })
    );
    mysqlMesh.position.set(-8, 0, 0);
    this.skillsOrbitGroup.add(mysqlMesh);
    this.skillsTechObjects.push(mysqlMesh);

    // 3. Spring Boot: Glowing Core Sphere
    const springMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 1),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, wireframe: true })
    );
    springMesh.position.set(0, 7, 0);
    this.skillsOrbitGroup.add(springMesh);
    this.skillsTechObjects.push(springMesh);

    // 4. Git: Branching Torus Ring
    const gitMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.25, 12, 36),
      new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.5, wireframe: true })
    );
    gitMesh.position.set(0, -7, 0);
    this.skillsOrbitGroup.add(gitMesh);
    this.skillsTechObjects.push(gitMesh);

    // 5. Python: Intertwined Rings
    const pyMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.2, 48, 8),
      new THREE.MeshStandardMaterial({ color: 0xeab308, wireframe: true })
    );
    pyMesh.position.set(5.5, 5.5, 0);
    this.skillsOrbitGroup.add(pyMesh);
    this.skillsTechObjects.push(pyMesh);

    // 6. DSA: Dynamic Graph Node Cluster
    const dsaCluster = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true })
      );
      node.position.set((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5);
      dsaCluster.add(node);
    }
    dsaCluster.position.set(-5.5, -5.5, 0);
    this.skillsOrbitGroup.add(dsaCluster);
    this.skillsTechObjects.push(dsaCluster);
  }

  // ==========================================
  // ACT 3: PROJECTS — "BUILDING WORLD"
  // ==========================================
  private buildProjectsAct(): void {
    this.projectsGroup.position.set(0, -135, -25);

    // Hospital Holographic System
    this.hospitalGroup = new THREE.Group();
    this.hospitalGroup.position.set(-6, 0, 0);

    const hospitalBuilding = new THREE.Mesh(
      new THREE.BoxGeometry(4, 5, 4),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 })
    );
    this.hospitalGroup.add(hospitalBuilding);

    const hospTex = createTextTexture('HOSPITAL MGMT SYSTEM', {
      fontSize: 52,
      color: '#60a5fa',
      subText: 'Java | JDBC | MySQL | Modular OOP',
      subColor: '#34d399',
    });
    const hospLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2),
      new THREE.MeshBasicMaterial({ map: hospTex, transparent: true })
    );
    hospLabel.position.set(0, 4, 0);
    this.hospitalGroup.add(hospLabel);

    this.projectsGroup.add(this.hospitalGroup);

    // E-Commerce Marketplace
    this.ecommerceGroup = new THREE.Group();
    this.ecommerceGroup.position.set(6, 0, 0);

    // Shopping Cart wireframe
    const cartGeo = new THREE.CylinderGeometry(1.6, 1.2, 1.8, 8);
    const cartMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true });
    this.cartMesh = new THREE.Mesh(cartGeo, cartMat);
    this.ecommerceGroup.add(this.cartMesh);

    const ecomTex = createTextTexture('E-COMMERCE PLATFORM', {
      fontSize: 52,
      color: '#c084fc',
      subText: 'Catalog > Cart > Orders > MySQL DB',
      subColor: '#f472b6',
    });
    const ecomLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2),
      new THREE.MeshBasicMaterial({ map: ecomTex, transparent: true })
    );
    ecomLabel.position.set(0, 4, 0);
    this.ecommerceGroup.add(ecomLabel);

    this.projectsGroup.add(this.ecommerceGroup);
  }

  // ==========================================
  // ACT 4: LETTER TUNNEL
  // ==========================================
  private buildLetterTunnelAct(): void {
    this.tunnelGroup.position.set(0, -180, -30);

    const words = [
      'JAVA', 'SQL', 'CODE', 'BUILD', 'DEBUG', 
      'LEARN', 'SOLVE', 'CREATE', 'SYSTEM', 'DATA', 
      'WEB', 'BACKEND', 'FULL STACK'
    ];

    words.forEach((w, idx) => {
      const tex = createTextTexture(w, {
        fontSize: 70,
        color: idx % 2 === 0 ? '#38bdf8' : '#a855f7',
      });
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 1.5),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );

      const angle = (idx / words.length) * Math.PI * 2;
      const radius = 6.5;
      const zOffset = (idx - words.length / 2) * 5;

      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, zOffset);
      mesh.rotation.z = angle + Math.PI / 2;
      this.tunnelGroup.add(mesh);
      this.tunnelWords.push(mesh);
    });
  }

  // ==========================================
  // ACT 5: EDUCATION — TIME MACHINE
  // ==========================================
  private buildEducationAct(): void {
    this.educationGroup.position.set(0, -225, -25);

    this.eduNumbersGroup = new THREE.Group();
    this.educationGroup.add(this.eduNumbersGroup);

    // 2021 (SSC 90%)
    const sscTex = createTextTexture('2021', {
      fontSize: 90,
      color: '#38bdf8',
      subText: 'SSC Secondary School — 90%',
      subColor: '#93c5fd',
    });
    const sscMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 2.2),
      new THREE.MeshBasicMaterial({ map: sscTex, transparent: true })
    );
    sscMesh.position.set(-6, 2.5, 0);
    this.eduNumbersGroup.add(sscMesh);

    // 2022-2024 (98.2%)
    const interTex = createTextTexture('98.2%', {
      fontSize: 100,
      color: '#fbbf24',
      subText: 'Intermediate MPC — Sri Sai Vivekananda',
      subColor: '#fde68a',
    });
    const interMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2.5),
      new THREE.MeshBasicMaterial({ map: interTex, transparent: true })
    );
    interMesh.position.set(6, 0, 0);
    this.eduNumbersGroup.add(interMesh);

    // 2024-2028 (Monolithic 2028 Structure)
    const ssnTex = createTextTexture('2028', {
      fontSize: 120,
      color: '#c084fc',
      subText: 'B.E. Computer Science — SSN College of Engineering (CGPA: 6.3)',
      subColor: '#e9d5ff',
      glowColor: '#a855f7',
    });
    const ssnMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 3.5),
      new THREE.MeshBasicMaterial({ map: ssnTex, transparent: true })
    );
    ssnMesh.position.set(0, -4, 2);
    this.eduNumbersGroup.add(ssnMesh);
  }

  // ==========================================
  // ACT 6: DSA — "THINK IN 3D" & CODE WALL
  // ==========================================
  private buildDSAAct(): void {
    this.dsaGroup.position.set(0, -270, -20);

    // 3D THINK & Nodes
    this.dsaNodesGroup = new THREE.Group();
    this.dsaGroup.add(this.dsaNodesGroup);

    const thinkTex = createTextTexture('THINK IN 3D', {
      fontSize: 80,
      color: '#ffffff',
      subText: 'ARRAY -> LINKED LIST -> BINARY TREE -> GRAPH -> ALGORITHM',
      subColor: '#fbbf24',
      glowColor: '#f59e0b',
    });
    const thinkMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 3),
      new THREE.MeshBasicMaterial({ map: thinkTex, transparent: true })
    );
    thinkMesh.position.set(0, 3.5, 0);
    this.dsaNodesGroup.add(thinkMesh);

    // Binary Tree Node representation
    const treeGroup = new THREE.Group();
    const rootNode = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 12), new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: true }));
    const leftNode = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true }));
    const rightNode = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true }));

    rootNode.position.set(0, 1, 0);
    leftNode.position.set(-1.8, -0.6, 0);
    rightNode.position.set(1.8, -0.6, 0);

    treeGroup.add(rootNode, leftNode, rightNode);
    this.dsaNodesGroup.add(treeGroup);

    // 3D Code Wall
    this.dsaCodeWall = new THREE.Group();
    const codeSnippet = 'for (int i = 0; i < n; i++) {\n    solve(problems);\n}';
    const codeTex = createTextTexture(codeSnippet, {
      fontSize: 48,
      color: '#34d399',
      width: 1024,
      height: 256,
    });
    const codeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2.5),
      new THREE.MeshBasicMaterial({ map: codeTex, transparent: true, opacity: 0.9 })
    );
    codeMesh.position.set(0, -3.5, 0);
    this.dsaCodeWall.add(codeMesh);
    this.dsaGroup.add(this.dsaCodeWall);
  }

  // ==========================================
  // ACT 7: CERTIFICATION — CHROME VAULT
  // ==========================================
  private buildCertAct(): void {
    this.certGroup.position.set(0, -310, -20);

    // Left Door
    const doorGeo = new THREE.BoxGeometry(3.5, 5, 0.4);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: true,
    });

    this.certDoorLeft = new THREE.Mesh(doorGeo, chromeMat);
    this.certDoorLeft.position.set(-1.75, 0, 0.5);
    this.certGroup.add(this.certDoorLeft);

    // Right Door
    this.certDoorRight = new THREE.Mesh(doorGeo, chromeMat);
    this.certDoorRight.position.set(1.75, 0, 0.5);
    this.certGroup.add(this.certDoorRight);

    // Inner Credentials Badge
    const certTex = createTextTexture('UDEMY CERTIFIED', {
      fontSize: 60,
      color: '#c084fc',
      subText: 'Java Developer: Core Java, OOP, Collections, Multithreading, JDBC',
      subColor: '#cbd5e1',
      glowColor: '#a855f7',
    });
    this.certInnerBadge = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 2.5),
      new THREE.MeshBasicMaterial({ map: certTex, transparent: true })
    );
    this.certInnerBadge.position.set(0, 0, -0.2);
    this.certGroup.add(this.certInnerBadge);
  }

  // ==========================================
  // ACT 8: CONTACT — "LET'S BUILD" & FINAL PORTAL
  // ==========================================
  private buildContactAct(): void {
    this.contactGroup.position.set(0, -350, -20);

    // Gigantic Glowing 3D Sphere Portal
    const sphereGeo = new THREE.IcosahedronGeometry(5.5, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    this.contactSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.contactGroup.add(this.contactSphere);

    // "LET'S BUILD SOMETHING GREAT"
    const buildTex = createTextTexture("LET'S BUILD", {
      fontSize: 100,
      color: '#ffffff',
      subText: 'SOMETHING EXTRAORDINARY TOGETHER',
      subColor: '#60a5fa',
      glowColor: '#3b82f6',
    });
    this.contactTextBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 3.5),
      new THREE.MeshBasicMaterial({ map: buildTex, transparent: true })
    );
    this.contactTextBanner.position.set(0, 3.8, 1);
    this.contactGroup.add(this.contactTextBanner);

    // Floating Final "HR"
    const hrTex = createTextTexture('HR', {
      fontSize: 140,
      color: '#38bdf8',
      glowColor: '#818cf8',
      width: 512,
      height: 512,
    });
    this.finalHRMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({ map: hrTex, transparent: true, opacity: 0.95 })
    );
    this.finalHRMesh.position.set(0, 0, 0.5);
    this.contactGroup.add(this.finalHRMesh);
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  private setupEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || this.isDestroyed) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  };

  private onMouseMove = (e: MouseEvent): void => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    this.targetMouseX = (e.clientX - halfX) / halfX;
    this.targetMouseY = (e.clientY - halfY) / halfY;

    // Update cursor trail
    if (this.cursorPositions) {
      // Map screen coords to 3D world plane roughly at z=12
      const x = this.targetMouseX * 12;
      const y = -this.targetMouseY * 7;
      const z = this.camera.position.z - 8;

      this.cursorPositions[this.cursorIdx * 3] = x;
      this.cursorPositions[this.cursorIdx * 3 + 1] = y;
      this.cursorPositions[this.cursorIdx * 3 + 2] = z;

      this.cursorIdx = (this.cursorIdx + 1) % (this.cursorPositions.length / 3);
      this.cursorTrail.geometry.attributes.position.needsUpdate = true;
    }
  };

  public setScrollProgress(progress: number): void {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  // ==========================================
  // MASTER RENDER LOOP & 3D CHOREOGRAPHY
  // ==========================================
  private animate = (): void => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth interpolations
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    // 1. Master Camera Travel Timeline along vertical Z-axis depth
    // Total vertical descent is ~350 units
    const camY = -this.scrollProgress * 350;
    this.camera.position.y = camY;

    // Subtle responsive tilt from mouse
    this.camera.rotation.y = -this.mouseX * 0.08;
    this.camera.rotation.x = this.mouseY * 0.08;

    // Subtle Starfield rotation
    this.starfield.rotation.y = time * 0.02;
    this.starfield.position.y = camY;

    // 2. Act 0: Hero Physics & Particle Dynamics
    if (this.heroParticleMesh) {
      const pCount = this.heroParticlesBase.length / 3;


      for (let i = 0; i < pCount; i++) {
        const ox = this.heroParticlesBase[i * 3];
        const oy = this.heroParticlesBase[i * 3 + 1];
        const oz = this.heroParticlesBase[i * 3 + 2];

        // Magnetic mouse pull when cursor is nearby
        const distToMouse = Math.hypot(ox - this.mouseX * 6, oy - (-this.mouseY * 3));
        const magnet = distToMouse < 4 ? (4 - distToMouse) * 0.15 : 0;

        // Disassembly as user starts scrolling past 5%
        const dispersion = this.scrollProgress > 0.04 ? (this.scrollProgress - 0.04) * 45 : 0;
        const angle = i * 0.3;

        this.heroParticlesCurrent[i * 3] = ox + Math.cos(angle) * dispersion + (this.mouseX * magnet);
        this.heroParticlesCurrent[i * 3 + 1] = oy + Math.sin(angle) * dispersion + (-this.mouseY * magnet);
        this.heroParticlesCurrent[i * 3 + 2] = oz + dispersion * 1.5;
      }
      this.heroParticleMesh.geometry.attributes.position.needsUpdate = true;

      // 3D rotation based on mouse
      this.heroGroup.rotation.y = this.mouseX * 0.25;
      this.heroGroup.rotation.x = -this.mouseY * 0.15;
    }

    // 3. Act 1: About Human Silhouette & Words Collision
    if (this.aboutGroup) {
      this.aboutSilhouetteMesh.rotation.y = time * 0.2;
      const devBanner = this.aboutWordsGroup.getObjectByName('developerBanner');
      if (devBanner) {
        devBanner.rotation.y = Math.sin(time * 0.5) * 0.08;
      }
    }

    // 4. Act 2: Skills Galaxy Orbit & Acceleration
    if (this.skillsOrbitGroup) {
      const orbitSpeed = 0.4 + (this.scrollProgress > 0.25 && this.scrollProgress < 0.38 ? 1.2 : 0);
      this.skillsOrbitGroup.rotation.z = time * orbitSpeed;
      this.skillsTechObjects.forEach(obj => {
        obj.rotation.x += 0.02;
        obj.rotation.y += 0.03;
      });
    }

    // 5. Act 3: Projects Transformations
    if (this.projectsGroup) {
      this.hospitalGroup.rotation.y = Math.sin(time * 0.8) * 0.15;
      this.ecommerceGroup.rotation.y = -Math.sin(time * 0.8) * 0.15;
      if (this.cartMesh) this.cartMesh.rotation.y = time * 0.6;
    }

    // 6. Act 4: Letter Tunnel Dynamic Flying
    this.tunnelWords.forEach((word) => {
      word.position.z += delta * 12;
      if (word.position.z > 20) {
        word.position.z = -30;
      }
    });

    // 7. Act 5: Education Time Machine
    if (this.eduNumbersGroup) {
      this.eduNumbersGroup.rotation.y = Math.sin(time * 0.6) * 0.1;
    }

    // 8. Act 6: DSA Think in 3D Tree & Code Wall
    if (this.dsaGroup) {
      this.dsaNodesGroup.rotation.y = time * 0.25;
      this.dsaCodeWall.position.y = -3.5 + Math.sin(time * 1.5) * 0.2;
    }

    // 9. Act 7: Certification Chrome Doors Opening
    if (this.certDoorLeft && this.certDoorRight) {
      const inCertZone = this.scrollProgress >= 0.84 && this.scrollProgress <= 0.94;
      const targetDoorAngle = inCertZone ? -Math.PI * 0.45 : 0;
      this.certDoorLeft.rotation.y += (targetDoorAngle - this.certDoorLeft.rotation.y) * 0.06;
      this.certDoorRight.rotation.y += (-targetDoorAngle - this.certDoorRight.rotation.y) * 0.06;
    }

    // 10. Act 8: Contact Converging Sphere & Final HR
    if (this.contactGroup) {
      this.contactSphere.rotation.y = time * 0.35;
      this.contactSphere.rotation.x = time * 0.2;
      this.finalHRMesh.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }

    // Dynamic light movement
    this.blueLight.position.x = Math.sin(time * 0.8) * 14;
    this.blueLight.position.y = camY + Math.cos(time * 0.8) * 10;
    this.purpleLight.position.x = -Math.sin(time * 0.8) * 14;
    this.purpleLight.position.y = camY - Math.cos(time * 0.8) * 10;

    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
