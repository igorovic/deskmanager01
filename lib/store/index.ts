import { Part } from "types";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  gltfBlobUrl: string;
  parts: Part[];
  hidden: string[];
  hidePart: (uuid: string) => void;
  showPart: (uuid: string) => void;
  setGltfBlobUrl: (url: string) => void;
  setParts: (parts: Part[]) => void;
}

const useStore = create<State>()(
  devtools((set) => ({
    gltfBlobUrl: "",
    hidden: [],
    parts: [],
    setParts: (parts: Part[]) => set((state) => ({ parts })),
    hidePart: (uuid: string) =>
      set((state) => {
        return { hidden: [...state.hidden, uuid] };
      }),
    showPart: (uuid: string) =>
      set((state) => {
        return { hidden: state.hidden.filter((item) => item !== uuid) };
      }),
    setGltfBlobUrl: (url: string) => set((state) => ({ gltfBlobUrl: url })),
  }))
);

export type { State };
export { useStore };
