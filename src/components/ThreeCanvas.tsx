"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isLight = theme === 'light';

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(isLight ? 0xffffff : 0x000000, 1);
    currentMount.appendChild(renderer.domElement);

    // Theme-aware colors
    const particleColor = isLight ? 0x1a1a2e : 0xe2e8f0;
    const particleGlowColor = isLight ? 0x0f172a : 0xa855f7;
    const connectionColor = isLight ? 0x64748b : 0x334155;

    // Particles - reduced for performance
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const baseAlphas = new Float32Array(particlesCount);
    const breathOffsets = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Spherical distribution
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];

      sizes[i] = Math.random() * 1.5 + 0.5;
      baseAlphas[i] = Math.random() * 0.3 + 0.3;
      breathOffsets[i] = Math.random() * Math.PI * 2;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Main particles - use normal blending in light theme so dark particles are visible
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: particleColor,
      transparent: true,
      opacity: isLight ? 1.0 : 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    // Glow particles - only in dark theme (additive blending doesn't work on light bg)
    const glowMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: particleGlowColor,
      transparent: true,
      opacity: isLight ? 0 : 0.25,
      sizeAttenuation: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    const glowParticles = new THREE.Points(particlesGeometry, glowMaterial);
    scene.add(particles);
    scene.add(glowParticles);

    // Connection lines - pre-calculated once, fewer connections
    const connectionPositions: number[] = [];
    const maxConnections = 2;
    const connectionDistance = 2.5;

    // Simple spatial grid for faster neighbor lookup
    const gridSize = 2.5;
    const grid: { [key: string]: number[] } = {};
    for (let i = 0; i < particlesCount; i++) {
      const gx = Math.floor(positions[i * 3] / gridSize);
      const gy = Math.floor(positions[i * 3 + 1] / gridSize);
      const gz = Math.floor(positions[i * 3 + 2] / gridSize);
      const key = `${gx},${gy},${gz}`;
      if (!grid[key]) grid[key] = [];
      grid[key].push(i);
    }

    for (let i = 0; i < particlesCount; i++) {
      let count = 0;
      const gx = Math.floor(positions[i * 3] / gridSize);
      const gy = Math.floor(positions[i * 3 + 1] / gridSize);
      const gz = Math.floor(positions[i * 3 + 2] / gridSize);

      // Check neighboring grid cells
      for (let dx = -1; dx <= 1 && count < maxConnections; dx++) {
        for (let dy = -1; dy <= 1 && count < maxConnections; dy++) {
          for (let dz = -1; dz <= 1 && count < maxConnections; dz++) {
            const key = `${gx + dx},${gy + dy},${gz + dz}`;
            const cell = grid[key];
            if (cell) {
              for (const j of cell) {
                if (j <= i || count >= maxConnections) continue;
                const dX = positions[i * 3] - positions[j * 3];
                const dY = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dZ = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
                if (dist < connectionDistance) {
                  connectionPositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                  );
                  count++;
                }
              }
            }
          }
        }
      }
    }

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: connectionColor,
      transparent: true,
      opacity: isLight ? 0.3 : 0.08,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const connectionsMesh = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connectionsMesh);

    // Mouse tracking for repulsion
    const mouse = new THREE.Vector2(-100, -100);
    const targetMouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation
    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;

    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Convert mouse to 3D space
      const mouse3D = new THREE.Vector3(mouse.x * 6, mouse.y * 6, 0);

      // Main particle rotation
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.08;
      particles.rotation.z = Math.cos(elapsedTime * 0.06) * 0.04;

      // Glow particles counter-rotate
      glowParticles.rotation.y = -elapsedTime * 0.01;
      glowParticles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Interactive repulsion + breathing effect (optimized)
      const posArray = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const sizeArray = particlesGeometry.getAttribute('size') as THREE.BufferAttribute;

      if (posArray && sizeArray) {
        const repulsionForce = 0.08;
        const repulsionRadius = 4;

        for (let i = 0; i < particlesCount; i++) {
          const x = posArray.array[i * 3];
          const y = posArray.array[i * 3 + 1];
          const z = posArray.array[i * 3 + 2];

          // Distance from mouse (squared for performance)
          const dx = x - mouse3D.x;
          const dy = y - mouse3D.y;
          const dz = z - mouse3D.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < repulsionRadius * repulsionRadius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (repulsionRadius - dist) / repulsionRadius;
            posArray.array[i * 3] = originalPositions[i * 3] + (dx / dist) * force * repulsionForce;
            posArray.array[i * 3 + 1] = originalPositions[i * 3 + 1] + (dy / dist) * force * repulsionForce;
            posArray.array[i * 3 + 2] = originalPositions[i * 3 + 2] + (dz / dist) * force * repulsionForce;

            sizeArray.array[i] = sizes[i] * (1 + force * 1.5);
          } else {
            // Spring back to original position
            posArray.array[i * 3] = x + (originalPositions[i * 3] - x) * 0.05;
            posArray.array[i * 3 + 1] = y + (originalPositions[i * 3 + 1] - y) * 0.05;
            posArray.array[i * 3 + 2] = z + (originalPositions[i * 3 + 2] - z) * 0.05;

            // Breathing effect (pre-computed offsets)
            const breathFactor = Math.sin(elapsedTime * 2 + breathOffsets[i]) * 0.2 + 1;
            sizeArray.array[i] = sizes[i] * breathFactor;
          }
        }

        posArray.needsUpdate = true;
        sizeArray.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Visibility API - pause animation when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      glowMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      renderer.dispose();
    };
  }, [isLight]);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default ThreeCanvas;
