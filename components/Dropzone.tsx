import { useEventListener } from "usehooks-ts";
import { useStore } from "lib/store";

export function Dropzone() {
  const setGltfBlobUrl = useStore((state) => state.setGltfBlobUrl);

  function handler(ev: DragEvent) {
    let dt = ev.dataTransfer;
    let files = dt?.files;
    if (files && files.length > 0) {
      const F = files[0];
      const blobUrl = URL.createObjectURL(F);
      console.debug(blobUrl);
      if (!blobUrl) return;
      setGltfBlobUrl(blobUrl);
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
