import { useEventListener } from "usehooks-ts";
import { useStore } from "lib/store";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Dropzone() {
  const setAvailableCameras = useStore((state) => state.setAvailableCameras);
  const selectCamera = useStore((state) => state.selectCamera);
  const setGltfBlobUrl = useStore((state) => state.setGltfBlobUrl);
  const setParts = useStore((state) => state.setParts);

  function handler(ev: DragEvent) {
    let dt = ev.dataTransfer;
    let files = dt?.files;
    if (files && files.length > 0) {
      const F = files[0];
      const blobUrl = URL.createObjectURL(F);
      console.debug(blobUrl);
      if (!blobUrl) return;
      setGltfBlobUrl(blobUrl);
      const loader = new GLTFLoader();
      loader.load(blobUrl, (model) => {
        if (model.cameras.length > 0) {
          setAvailableCameras(model.cameras);
          selectCamera(0);
        }
        const names = model.scene.children.map((O) => O.uuid);

        setParts(names);
      });
    }
  }

  function preventDefaults(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  useEventListener("drop", preventDefaults);
  useEventListener("dragenter", preventDefaults);
  useEventListener("dragover", preventDefaults);
  useEventListener("dragleave", preventDefaults);
  useEventListener("drop", handler);
  return null;
}
