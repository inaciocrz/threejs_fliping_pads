import style from "../styles/Home.module.css";
import Pads from "../components/Three/Pads";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <Canvas
          className={style.canvas}
          shadows
          camera={{ position: [0.5, 2, 5], fov: 60 }}
        >
          <pointLight
            position={[4.5, 3.5, 1.5]}
            intensity={0.5}
            castShadow
            shadow-radius={30}
          />
          <ambientLight intensity={0.2} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Pads />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
