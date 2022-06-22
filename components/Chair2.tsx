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
  const setParts = useStore((state) => state.setParts);

  const blobUrl = useStore((state) => state.gltfBlobUrl);
  const group = useRef<any>();

  const gltf = useLoader(GLTFLoader, blobUrl);
  console.debug("gltf", gltf);
  //@ts-ignore
  const nodes = Object.entries(gltf.nodes)
    .map(([name, node]) => node)
    //@ts-ignore
    .filter((node) => node.isMesh);
  setParts(nodes.map((N) => ({ name: N.name, uuid: N.uuid })));

  return (
    <Suspense fallback={<Loader />}>
      <group ref={group} {...props} dispose={null}>
        {nodes.map((node) => (
          <HidableMesh key={node.uuid} node={node} />
        ))}
      </group>
    </Suspense>
  );
}

function HidableMesh({ node }: any) {
  const hiddenParts = useStore((state) => state.hidden);
  return <primitive object={node} visible={!hiddenParts.includes(node.uuid)} />;
}

//useGLTF.preload("/chair.glb");
//{Object.entries(gltf.nodes).map(([name, geo]) => {
