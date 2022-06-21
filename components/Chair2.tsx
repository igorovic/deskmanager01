import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { useStore } from "lib/store";
//import * as THREE from "three"

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
interface Props {
  parts: string[];
  url: string;
}

export default function Model(props: any) {
  const visible = useStore((state) => state.visibleParts);
  const blobUrl = useStore((state) => state.gltfBlobUrl);
  const group = useRef<any>();

  const gltf = useLoader(GLTFLoader, blobUrl);
  console.debug("gltf", gltf);
  //@ts-ignore
  const nodes = Object.entries(gltf.nodes).map(([name, node]) => node);

  return (
    <Suspense fallback={<Loader />}>
      <group ref={group} {...props} dispose={null}>
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
