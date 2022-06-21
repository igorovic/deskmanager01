import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useStore } from "lib/store";
//import Scene from "components/Scene";

const Scene = dynamic(() => import("../components/Scene"), {
  ssr: false,
  suspense: false,
});

const Home: NextPage<any> = () => {
  return (
    <Suspense fallback={`Loading...`}>
      <Scene />
    </Suspense>
  );
};

export default Home;
