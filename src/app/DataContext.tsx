import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Customer, initialCustomers } from "./features/customers";
import { Item, initialItems } from "./features/items";
import { ItemPrice, initialItemPrices } from "./features/itemPrices";
import { ModTable, initialMods } from "./features/modTable";

const DataContext = createContext<{
  items: Item[];
  itemPrices: ItemPrice[];
  mods: ModTable[];
  customers: Customer[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  setItemPrices: Dispatch<SetStateAction<ItemPrice[]>>;
  setMods: Dispatch<SetStateAction<ModTable[]>>;
  setCustomers: Dispatch<SetStateAction<Customer[]>>;
}>({
  items: [],
  itemPrices: [],
  mods: [],
  customers: [],
  setItems: () => {},
  setItemPrices: () => {},
  setMods: () => {},
  setCustomers: () => {},
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [itemPrices, setItemPrices] = useState<ItemPrice[]>(initialItemPrices);
  const [mods, setMods] = useState<ModTable[]>(initialMods);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  return (
    <DataContext.Provider
      value={{
        items,
        itemPrices,
        mods,
        customers,
        setItems,
        setItemPrices,
        setMods,
        setCustomers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
