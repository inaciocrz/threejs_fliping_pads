/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { AnimationMixer, LoopOnce } from "three";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./Pads.gltf");
  const { actions, mixer } = useAnimations(animations, group);

  let count = 0;
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(0);

  const textureDesktop = useTexture([
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
  ]);
  const textureMobile = useTexture([
    "./images/6.jpg",
    "./images/7.jpg",
    "./images/8.jpeg",
    "./images/9.jpg",
    "./images/10.png",
  ]);

  useEffect(() => {
    mixer.addEventListener("finished", (e) => {
      if (e.action._clip.name === "Landscape_Rotate") {
        actions["Landscape_Float"].reset();
        actions["Portrait_Float"].reset();

        setFrontIndex(count);
      }
    });
  }, []);

  //play animations
  function playRotate() {
    count++;
    if (count > 4) count = 0;
    setBackIndex(count);
    actions["Landscape_Float"].fadeOut(1);
    actions["Portrait_Float"].fadeOut(1);

    actions["Portrait_Rotate"].reset().play();
    actions["Landscape_Rotate"].reset().play();
  }

  useEffect(() => {
    actions["Landscape_Rotate"].setLoop(LoopOnce);
    actions["Portrait_Rotate"].setLoop(LoopOnce);
    actions["Landscape_Rotate"].clampWhenFinished = true;
    actions["Portrait_Rotate"].clampWhenFinished = true;
    actions["Landscape_Float"].timeScale = 0.5;
    actions["Portrait_Float"].timeScale = 0.5;

    actions["Landscape_Float"].play();
    actions["Portrait_Float"].play();

    setInterval(playRotate, 5000);
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={0.3}>
      <group name="Scene">
        <group name="Pad_Landscape" rotation={[-0.34, 0.46, 0.16]}>
          <mesh
            name="Pad_Landscape_1"
            geometry={nodes.Pad_Landscape_1.geometry}
            receiveShadow
          >
            <meshLambertMaterial map={textureDesktop[frontIndex]}/>
          </mesh>
          <mesh
            name="Pad_Landscape_2"
            geometry={nodes.Pad_Landscape_2.geometry}
            receiveShadow
          >
            <meshLambertMaterial map={textureDesktop[backIndex]} map-flipY={true}/>
          </mesh>
          <mesh
            name="Pad_Landscape_3"
            geometry={nodes.Pad_Landscape_3.geometry}
            material={materials.Border}
            receiveShadow
          />
        </group>
        <group
          name="Pad_Portrait"
          position={[6.65, 3.02, -1.49]}
          rotation={[-0.34, 0.46, 0.16]}
        >
          <mesh
            name="Pad_Portrait_1"
            geometry={nodes.Pad_Portrait_1.geometry}
            material={materials.Front_Image_Portrait}
            castShadow
          >
            <meshStandardMaterial map={textureMobile[frontIndex]} />
          </mesh>
          <mesh
            name="Pad_Portrait_2"
            geometry={nodes.Pad_Portrait_2.geometry}
            material={materials.Back_Image_Portrait}
            castShadow
          >
            <meshStandardMaterial map={textureMobile[backIndex]} />
          </mesh>
          <mesh
            name="Pad_Portrait_3"
            geometry={nodes.Pad_Portrait_3.geometry}
            material={materials.Border}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./Pads.gltf");
