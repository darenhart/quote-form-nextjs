import { SearchableCombobox } from "@/components/searchable-combobox";
import { type FC, useEffect, useContext, use } from "react";
import { Input } from "@/components/input";
import { FormContext, SelectedItem } from "@/app/FormContext";
import { DataContext } from "@/app/DataContext";

export const FormItems: FC = () => {
  const { selectedItems, setSelectedItems } = useContext(FormContext);

  useEffect(() => {
    if (selectedItems[selectedItems.length - 1] !== undefined) {
      setSelectedItems([...selectedItems, undefined]);
    }
  }, [selectedItems, setSelectedItems]);

  return (
    <div className="grid w-full grid-cols-[3fr_1fr_1fr_1fr_1fr_5fr_2fr_1fr_1fr_2fr_2fr] divide-x divide-y">
      <div className="bg-gray-300 p-1 font-bold">SKU</div>
      <div className="bg-gray-300 p-1 font-bold">QTY</div>
      <div className="bg-gray-300 p-1 font-bold">Fin Ends</div>
      <div className="bg-gray-300 p-1 font-bold">Hinge</div>
      <div className="bg-gray-300 p-1 font-bold">Depth</div>
      <div className="bg-gray-300 p-1 font-bold">Mod1</div>
      <div className="bg-gray-300 p-1 font-bold">Mod2</div>
      <div className="bg-gray-300 p-1 font-bold">Mod</div>
      <div className="bg-gray-300 p-1 font-bold">Markup</div>
      <div className="bg-gray-300 p-1 font-bold">Price Per Unit</div>
      <div className="bg-gray-300 p-1 font-bold">Multiplier Added</div>

      {selectedItems.map((item, index) => (
        <FormItem item={item} key={`${item?.sku}-${index}`} index={index} />
      ))}
    </div>
  );
};

const FormItem: FC<{
  item: SelectedItem | undefined;
  index: number;
}> = ({ item, index }) => {
  const { setSelectedItems, selectedItems } = useContext(FormContext);
  const { items, mods } = useContext(DataContext);

  const onChange = (item: SelectedItem | undefined) => {
    const updatedItems = [...selectedItems];
    updatedItems[index] = item;
    setSelectedItems(updatedItems);
  };

  return (
    <>
      <div>
        <SearchableCombobox
          value={item?.sku || ""}
          onChange={(sku) => {
            onChange(items.find((i) => i.sku === sku));
          }}
          options={items.map((item) => ({
            label: item.sku,
            value: item.sku,
          }))}
        />
      </div>
      <div>
        {item ? (
          <Input
            value={item?.qty}
            onChangeValue={(qty) => onChange({ ...item, qty })}
            type="number"
          />
        ) : null}
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        {item ? (
          <SearchableCombobox
            value={item?.selectedMod || ""}
            onChange={(mod) => {
              const selectedMod = mods.find((m) => m.name === mod)?.name;
              onChange({ ...item, selectedMod });
            }}
            options={mods
              .filter((mod) => mod.mod === item.modCode)
              .map((mod) => ({
                label: mod.name,
                value: mod.name,
              }))}
          />
        ) : null}
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div className="flex items-center px-1">{item?.pricePerUnit}</div>
      <div></div>
    </>
  );
};
