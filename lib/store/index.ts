import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface State {
  gltfBlobUrl: string;
  currentCamera: any;
  cameras: any[];
  parts: any[];
  visibleParts: any[];
  setVisibileParts: (parts: any[]) => void;
  setGltfBlobUrl: (url: string) => void;
  setParts: (parts: any[]) => void;
  selectCamera: (idx: any) => void;
  setAvailableCameras: (cameras: any[]) => void;
}

const useStore = create<State>()(
  devtools((set) => ({
    gltfBlobUrl: "",
    currentCamera: null,
    cameras: [],
    parts: [],
    visibleParts: [],
    setVisibileParts: (parts: any) => set(() => ({ visibleParts: parts })),
    setGltfBlobUrl: (url: string) => set((state) => ({ gltfBlobUrl: url })),
    setParts: (parts: any[]) => set((state) => ({ parts })),
    setAvailableCameras: (cameras: any) => set((state) => ({ cameras })),
    selectCamera: (idx: any) =>
      set((state) => ({ currentCamera: state.cameras[idx] })),
  }))
);

export type { State };
export { useStore };
