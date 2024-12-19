import { FC, useContext } from "react";
import { Sheet, Row, Template } from "@/components/sheet";
import { DataContext } from "../DataContext";

const name = "Items";

export type Item = {
  sku: string;
  modCode: string;
  price: number;
};

const itemsTemplate: Template<Item> = {
  sku: { label: "SKU" },
  modCode: { label: "ModCode" },
  price: { label: "Price" },
};

export const initialItems: Item[] = [
  {
    sku: "1234",
    modCode: "MOD1_",
    price: 100,
  },
  {
    sku: "5678",
    modCode: "MOD3_",
    price: 200,
  },
  {
    sku: "9012",
    modCode: "MOD3_",
    price: 300,
  },
];

export const ItemsSheet: FC = () => {
  const { items, setItems } = useContext(DataContext);

  return (
    <Sheet
      name={name}
      initialItems={initialItems}
      template={itemsTemplate}
      items={items}
      onItemsChange={(items: Row[]) => setItems(items as Item[])}
    />
  );
};
