import { Select } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { useStore } from "lib/store";
export default function Controls() {
  const parts = useStore((state) => state.parts);
  const showPart = useStore((state) => state.showPart);
  const hidePart = useStore((state) => state.hidePart);

  return (
    <div>
      <p>Drop model in the window</p>
      <div className="flex flex-shrink-0 flex-wrap gap-2">
        {parts.map((p) => (
          <Checkbox
            key={p.uuid}
            label={p.name}
            defaultChecked
            value={p.uuid}
            onChange={(ev) => {
              console.debug(ev.target.checked);
              if (ev.target.checked) {
                showPart(ev.target.value);
              } else {
                hidePart(ev.target.value);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
