import Model from "components/Chair2";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useStore } from "lib/store";

import Controls from "components/Controls";
import { Dropzone } from "components/Dropzone";
import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Scene() {
  const blobUrl = useStore((state) => state.gltfBlobUrl);
  const ready = blobUrl && blobUrl.length > 0;

  return (
    <>
      <Dropzone />
      <Controls />

      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {ready ? <Model /> : null}
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
}

{
  /* <Html style={{ color: "red" }}>
          {currentCamera?.name ?? "no camera"}
        </Html> */
}
