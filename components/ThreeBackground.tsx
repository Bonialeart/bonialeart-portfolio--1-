
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Augment JSX namespace to include Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      instancedMesh: any;
      meshBasicMaterial: any;
      torusGeometry: any;
      octahedronGeometry: any;
      tetrahedronGeometry: any;
      icosahedronGeometry: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      instancedMesh: any;
      meshBasicMaterial: any;
      torusGeometry: any;
      octahedronGeometry: any;
      tetrahedronGeometry: any;
      icosahedronGeometry: any;
    }
  }
}

const ThreeBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      {/* Optimization: Cap DPR at 1.5 to prevent lag on high-density screens */}
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1} />
        <DoodleField />
      </Canvas>
    </div>
  );
};

const DoodleField = () => {
    // Geometries need to be created once to be efficient
    const torusGeo = useMemo(() => new THREE.TorusGeometry(0.4, 0.08, 8, 16), []);
    const octaGeo = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), []);
    const tetraGeo = useMemo(() => new THREE.TetrahedronGeometry(0.5, 0), []);
    const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(0.4, 0), []);

    return (
        <group>
            {/* Indigo Rings */}
            <ShapeInstances geometry={torusGeo} count={10} color="#6366f1" range={20} />
            {/* Pink Diamonds */}
            <ShapeInstances geometry={octaGeo} count={10} color="#ec4899" range={20} />
            {/* Orange Triangles */}
            <ShapeInstances geometry={tetraGeo} count={10} color="#f97316" range={20} />
            {/* White Blobs */}
            <ShapeInstances geometry={icoGeo} count={15} color="#ffffff" range={25} />
        </group>
    )
}

const ShapeInstances = ({ geometry, count, color, range }: { geometry: THREE.BufferGeometry, count: number, color: string, range: number }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const [dummy] = useState(() => new THREE.Object3D());
    
    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * 10
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: Math.random() * 0.4 + 0.4, // Random scale
            velocity: [
                (Math.random() - 0.5) * 0.015, 
                (Math.random() - 0.5) * 0.015, 
                0
            ],
            rotSpeed: [
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            ]
        }));
    }, [count, range]);

    useFrame(() => {
        if (!mesh.current) return;
        
        particles.forEach((p, i) => {
            // Move
            p.position[0] += p.velocity[0];
            p.position[1] += p.velocity[1];
            
            // Wrap around logic to keep them in view
            const limit = range / 1.5;
            if (p.position[0] > limit) p.position[0] = -limit;
            if (p.position[0] < -limit) p.position[0] = limit;
            if (p.position[1] > limit) p.position[1] = -limit;
            if (p.position[1] < -limit) p.position[1] = limit;

            // Rotation
            p.rotation[0] += p.rotSpeed[0];
            p.rotation[1] += p.rotSpeed[1];

            dummy.position.set(p.position[0], p.position[1], p.position[2] as number);
            dummy.rotation.set(p.rotation[0], p.rotation[1], p.rotation[2]);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
            <meshBasicMaterial color={color} wireframe wireframeLinewidth={3} transparent opacity={0.8} />
        </instancedMesh>
    );
}

export default ThreeBackground;
