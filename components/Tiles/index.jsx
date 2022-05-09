import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./tile_animation.gltf");
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" rotation={[0, -1, 0]} scale={5}>
        <mesh
          name="Cube001"
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[0.03, -0.02, -0.03]}
          rotation={[0, 0, 0.4]}
          receiveShadow
        />
        <group
          name="Cube002"
          position={[0.03, 0.24, -0.38]}
          rotation={[0, 0, 0.4]}
        >
          <mesh
            name="Cube004"
            geometry={nodes.Cube004.geometry}
            material={materials.sm_foto_2}
            castShadow
          />
          <mesh
            name="Cube004_1"
            geometry={nodes.Cube004_1.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube004_2"
            geometry={nodes.Cube004_2.geometry}
            material={materials.sm_foto_1}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/tile_animation.gltf");
