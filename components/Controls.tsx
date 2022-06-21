import { Select } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { useStore } from "lib/store";
export default function Controls() {
  const parts = useStore((state) => state.parts);
  const setVisible = useStore((state) => state.setVisibileParts);
  const cameras = useStore((state) =>
    state.cameras.map((C) => ({ label: C.name, value: C.uuid }))
  );
  const selectCamera = useStore((state) => state.selectCamera);
  const currentCamera = useStore((state) => state.currentCamera);
  return (
    <div className="grid grid-cols-2">
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
              /* setVisible((prev) => {
                if (ev.target.checked === true) {
                  return [...prev, ev.target.value];
                } else {
                  return prev.filter((nn) => nn !== ev.target.value);
                }
              }); */
            }}
          />
        ))}
      </div>
      <div>
        <p>current camera .. {currentCamera?.name}</p>
        <Select
          label="Camera"
          data={cameras}
          onChange={(value) => {
            if (!!value) {
              const idx = cameras.findIndex(
                (element) => element.value === value
              );
              selectCamera(idx);
            }
          }}
        />
      </div>
    </div>
  );
}
