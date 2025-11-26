
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// Augment JSX namespace to include Three.js elements used in the component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      coneGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      meshBasicMaterial: any;
      points: any;
      pointsMaterial: any;
      bufferGeometry: any;
      bufferAttribute: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      directionalLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      coneGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      meshBasicMaterial: any;
      points: any;
      pointsMaterial: any;
      bufferGeometry: any;
      bufferAttribute: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      directionalLight: any;
    }
  }
}

const StylusModel = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const progress = scrollProgress.get(); 
      
      // Idle Animation: Gentle floating (Breathing) - NO SPINNING when idle
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
      
      // Scroll Interaction: Rotation driven purely by scroll
      // The user requested "no giro cuando no hago nada" (no spin when doing nothing)
      // So rotation is locked to scroll progress.
      groupRef.current.rotation.y = progress * Math.PI * 2; 
      groupRef.current.rotation.z = 0.4 + (progress * 0.3); 
      groupRef.current.rotation.x = 0.1;
    }
  });

  // Materials defined to match XP-Pen style: Silver body, Black Grip, Silver Cone, Black Nib
  const silverMaterial = <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />;
  const blackMaterial = <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.1} />;
  const buttonMaterial = <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />;
  const nibMaterial = <meshStandardMaterial color="#020617" roughness={0.9} />;

  return (
    // Scale reduced to 0.85 to fix "muy grande" (too big) issue and prevent cutting off
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      
      {/* --- XP-PEN Style Construction --- */}

      {/* 1. NIB (Black Tip) */}
      <mesh position={[0, -2.35, 0]}>
        <coneGeometry args={[0.02, 0.1, 32]} />
        {nibMaterial}
      </mesh>

      {/* 2. FRONT CONE (Silver) */}
      <mesh position={[0, -2.0, 0]}>
        {/* Tapered cylinder connecting nib to grip */}
        <cylinderGeometry args={[0.14, 0.02, 0.6, 32]} />
        {silverMaterial}
      </mesh>

      {/* 3. GRIP SECTION (Black Rubber) */}
      <group position={[0, -0.8, 0]}>
        <mesh>
            <cylinderGeometry args={[0.15, 0.14, 1.8, 32]} />
            {blackMaterial}
        </mesh>
        
        {/* Buttons housing (Flat area) */}
        <mesh position={[0.13, 0.1, 0]}>
             <boxGeometry args={[0.06, 0.8, 0.12]} />
             {blackMaterial}
        </mesh>
        
        {/* Button 1 (Lower) */}
        <mesh position={[0.16, -0.15, 0]}>
             <boxGeometry args={[0.02, 0.25, 0.08]} />
             {buttonMaterial}
        </mesh>
        
        {/* Button 2 (Upper) */}
        <mesh position={[0.16, 0.35, 0]}>
             <boxGeometry args={[0.02, 0.25, 0.08]} />
             {buttonMaterial}
        </mesh>
      </group>

      {/* 4. MAIN BODY (Silver Gradient Taper) */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.11, 0.15, 1.6, 32]} /> 
        {silverMaterial}
      </mesh>

      {/* 5. TAIL (Silver Long Taper) */}
      <mesh position={[0, 2.2, 0]}>
         <cylinderGeometry args={[0.04, 0.11, 1.0, 32]} />
         {silverMaterial}
      </mesh>

      {/* 6. END CAP (Rounded Silver) */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        {silverMaterial}
      </mesh>

      <FloatingParticles />
    </group>
  );
};

const FloatingParticles = () => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count; i++) {
        const r = 0.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 6;
        
        positions[i*3] = r * Math.cos(theta);
        positions[i*3+1] = y;
        positions[i*3+2] = r * Math.sin(theta);
    }

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position" 
                    count={count} 
                    array={positions} 
                    itemSize={3} 
                />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#818cf8" transparent opacity={0.3} sizeAttenuation />
        </points>
    )
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#333" wireframe />
  </mesh>
);

interface ArtModelProps {
  scrollProgress: MotionValue<number>;
}

const ArtModel: React.FC<ArtModelProps> = ({ scrollProgress }) => {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      {/* Adjusted Camera Z to 7.5 to zoom out further and prevent clipping */}
      {/* Optimization: Cap DPR at 1.5 to prevent lag on high-density screens */}
      <Canvas 
        camera={{ position: [0, 0, 7.5], fov: 45 }} 
        dpr={[1, 1.5]}
        shadows
        gl={{ powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        
        {/* 3-Point Lighting setup for better 3D form definition */}
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2.5} castShadow />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#6366f1" /> {/* Subtle Indigo fill from back */}
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />
        
        <React.Suspense fallback={<LoadingFallback />}>
            <StylusModel scrollProgress={scrollProgress} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default ArtModel;
