import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
//import * as THREE from "three"

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
interface Props {
  parts: string[];
  url: string;
}

export default function Model({ parts = [], url, ...groupProps }: Props) {
  const gltf = useLoader(GLTFLoader, url);
  const group = useRef<any>();
  console.debug("gltf", gltf);

  //@ts-ignore
  const nodes = Object.entries(gltf.nodes).map(([name, node]) => node);

  /* .filter(
    ([name, node]) => node.castShadow
  ); */

  return (
    <Suspense fallback={<Loader />}>
      <group ref={group} {...groupProps} dispose={null}>
        {nodes.map((node) => {
          //@ts-ignore
          if (!node.isMesh) return null;
          return (
            <primitive
              key={node.uuid}
              object={node}
              //visible={parts.includes(geo.uuid)}
            />
          );
        })}
      </group>
    </Suspense>
  );
}
//useGLTF.preload("/chair.glb");
//{Object.entries(gltf.nodes).map(([name, geo]) => {
