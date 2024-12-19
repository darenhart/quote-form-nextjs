import { FC, useContext } from "react";
import { Sheet, Row, Template } from "@/components/sheet";
import { DataContext } from "../DataContext";

const name = "ModTable";

export type ModTable = {
  mod: string;
  type: string;
  name: string;
};

const modTableTemplate: Template<ModTable> = {
  mod: { label: "Mod" },
  type: { label: "Type" },
  name: { label: "Name" },
};

export const initialMods: ModTable[] = [
  {
    mod: "MOD1_",
    type: "F10-",
    name: "FFDR-DWRF-Face Frame Doors & Drawer Fronts remain",
  },
  {
    mod: "MOD1_",
    type: "F11-",
    name: "FFONLY-Face Frame Only",
  },
  {
    mod: "MOD3_",
    type: "P1-",
    name: "FIN-Finished Interior",
  },
  {
    mod: "MOD3_",
    type: "F13-",
    name: 'WD - 1" Width Increase',
  },
];

export const ModTableSheet: FC = () => {
  const { mods, setMods } = useContext(DataContext);
  return (
    <Sheet
      name={name}
      initialItems={initialMods}
      template={modTableTemplate}
      items={mods}
      onItemsChange={(items: Row[]) => setMods(items as ModTable[])}
    />
  );
};
