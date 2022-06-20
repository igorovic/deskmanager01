import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useState, useRef } from "react";
import { Checkbox } from "@mantine/core";
import Model from "components/Chair2";

import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEventListener } from "usehooks-ts";

const Home: NextPage<any> = () => {
  const [blobUrl, setBlobUrl] = useState<string | undefined>();
  const [parts, setParts] = useState<string[]>([]);
  const [visible, setVisible] = useState<string[]>([]);
  const sceneRef = useRef<GLTF["scene"] | undefined>();

  function preventDefaults(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  useEventListener("drop", preventDefaults);
  useEventListener("dragenter", preventDefaults);
  useEventListener("dragover", preventDefaults);
  useEventListener("dragleave", preventDefaults);
  useEventListener("drop", handler);
  /* useEventListener("drop", globalThis.document, preventDefaults);
  useEventListener("dragenter", globalThis.document, preventDefaults);
  useEventListener("dragover", globalThis.document, preventDefaults);
  useEventListener("dragleave", globalThis.document, preventDefaults);

  useEventListener("drop", globalThis.document, handler); */

  function handler(ev: DragEvent) {
    let dt = ev.dataTransfer;
    let files = dt?.files;
    if (files && files.length > 0) {
      const F = files[0];
      const blobUrl = URL.createObjectURL(F);
      console.debug(blobUrl);
      if (!blobUrl) return;
      setBlobUrl(blobUrl);
      const loader = new GLTFLoader();
      loader.load(blobUrl, (model) => {
        const names = model.scene.children.map((O) => O.uuid);
        sceneRef.current = model.scene;
        setParts(names);
        setVisible(names);
      });
    }
  }

  return (
    <>
      <div>
        <p>Drop model in the window</p>
        {parts.map((p) => (
          <Checkbox
            key={p}
            label={p}
            defaultChecked
            value={p}
            onChange={(ev) => {
              console.debug(ev.target.checked);

              setVisible((prev) => {
                if (ev.target.checked === true) {
                  return [...prev, ev.target.value];
                } else {
                  return prev.filter((nn) => nn !== ev.target.value);
                }
              });
            }}
          />
        ))}
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {blobUrl ? <Model parts={visible} url={blobUrl} /> : null}

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Canvas>
    </>
  );
};

export default Home;
