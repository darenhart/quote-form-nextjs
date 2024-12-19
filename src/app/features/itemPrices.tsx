import { FC, useContext } from "react";
import { Sheet, Row, Template } from "@/components/sheet";
import { DataContext } from "../DataContext";

const name = "ItemPrices";

export type ItemPrice = {
  sku: string;
  species: string;
  doorStyle: string;
  price: number;
};

const itemPricesTemplate: Template<ItemPrice> = {
  sku: { label: "SKU" },
  species: { label: "Species" },
  doorStyle: { label: "Door" },
  price: { label: "Price" },
};

export const initialItemPrices: ItemPrice[] = [
  {
    sku: "1234",
    species: "cherry",
    doorStyle: "vail",
    price: 110,
  },
  {
    sku: "1234",
    species: "cherry",
    doorStyle: "boston",
    price: 120,
  },
];

export const ItemPricesSheet: FC = () => {
  const { itemPrices, setItemPrices } = useContext(DataContext);

  return (
    <Sheet
      name={name}
      initialItems={initialItemPrices}
      template={itemPricesTemplate}
      items={itemPrices}
      onItemsChange={(items: Row[]) => setItemPrices(items as ItemPrice[])}
    />
  );
};
