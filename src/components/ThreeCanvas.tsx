import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse-reactive 3D rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core 3D Geometry: Wireframe Polyhedron
    const coreGeometry = new THREE.IcosahedronGeometry(6.5, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeometry = new THREE.SphereGeometry(3.5, 16, 16);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // 2. Orbital 3D Rings
    const ring1Geometry = new THREE.TorusGeometry(8.5, 0.05, 16, 100);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(10.5, 0.04, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 3. 3D Particle Cloud
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x60a5fa);
    const colorPurple = new THREE.Color(0xc084fc);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? colorBlue : colorPurple;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight1.position.set(12, 12, 12);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 50);
    pointLight2.position.set(-12, -12, 10);
    scene.add(pointLight2);

    // Mouse interactive coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0006;
      mouseY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate group with mouse tracking & continuous motion
      mainGroup.rotation.y = targetX * 1.5 + elapsedTime * 0.06;
      mainGroup.rotation.x = targetY * 1.5 + Math.sin(elapsedTime * 0.2) * 0.08;

      // Independent rotations for rings
      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.12;

      // Subtle pulse on core
      const scale = 1 + Math.sin(elapsedTime * 1.2) * 0.03;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
