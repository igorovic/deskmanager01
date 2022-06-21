import Model from "components/Chair2";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useStore } from "lib/store";

import Controls from "components/Controls";
import { Dropzone } from "components/Dropzone";
import { Html } from "@react-three/drei";
export default function Scene() {
  const blobUrl = useStore((state) => state.gltfBlobUrl);
  const ready = blobUrl && blobUrl.length > 0;
  const currentCamera = useStore((state) => state.currentCamera);
  return (
    <>
      <Dropzone />
      <Controls />

      <Canvas camera={currentCamera ?? undefined}>
        <Html style={{ color: "red" }}>
          {currentCamera?.name ?? "no camera"}
        </Html>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {ready ? <Model /> : null}

        {/* <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
        /> */}
      </Canvas>
    </>
  );
}
