import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Template } from "@/components/sheet";
import { Customer, emptyCustomer } from "./features/customers";
import { Item } from "./features/items";
import { DataContext } from "./DataContext";

export type Order = {
  originalOrder: string;
  originalPo: string;
  originalOrderId: string;
  promoCode: string;
  residenceCode: string;
  tag: string;
  designerName: string;
  id: string;
  colorCode: string;
  colorDescription: string;
  seriesBoxConstruction: string;
  species: string;
  doorStyle: string;
  finish: string;
  hinge: string;
  fivePieceDrawerFront: string;
  drawerGuideOption: string;
  multiplier: string;
  salesTaxRate: string;
  freightRate: string;
};

export const orderTemplate: Template<Order> = {
  originalOrder: { label: "Original Order" },
  originalPo: { label: "Original PO" },
  originalOrderId: { label: "Original Order ID" },
  promoCode: { label: "Promo Code" },
  residenceCode: { label: "Residence Code" },
  tag: { label: "Tag" },
  designerName: { label: "Designer Name" },
  id: { label: "ID" },
  colorCode: { label: "YourColor  Code: (Sherwin Williams/Benjamin Moore)" },
  colorDescription: { label: "YourColor Color Description" },
  seriesBoxConstruction: { label: "Series (Box Construction)" },
  species: { label: "Species" },
  doorStyle: { label: "Door Style" },
  finish: { label: "Finish" },
  hinge: { label: "Hinge" },
  fivePieceDrawerFront: { label: "5 Piece Drawer Front" },
  drawerGuideOption: { label: "Drawer Guide Option" },
  multiplier: { label: "Multiplier" },
  salesTaxRate: { label: "Sales Tax Rate" },
  freightRate: { label: "Freight Rate/Cab" },
};

const emptyOrder: Order = Object.fromEntries(
  Object.keys(orderTemplate).map((key) => [key, ""]),
) as Order;

emptyOrder.species = "cherry";
emptyOrder.doorStyle = "vail";

export interface SelectedItem extends Item {
  qty?: string;
  selectedMod?: string;
  pricePerUnit?: number;
}

const FormContext = createContext<{
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  customer: Customer;
  setCustomer: Dispatch<SetStateAction<Customer>>;
  selectedItems: (SelectedItem | undefined)[];
  setSelectedItems: (items: (SelectedItem | undefined)[]) => void;
}>({
  order: emptyOrder,
  setOrder: () => {},
  customer: emptyCustomer,
  setCustomer: () => {},
  selectedItems: [undefined],
  setSelectedItems: () => {},
});

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState(emptyOrder);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [selectedItems, setSelectedItems] = useState<
    (SelectedItem | undefined)[]
  >([undefined]);

  const { itemPrices } = useContext(DataContext);

  const setSelectedItemsAndCalculate = useCallback(
    (items: (SelectedItem | undefined)[]) => {
      setSelectedItems(
        items.map((item) => {
          if (item) {
            const pricePerUnit =
              itemPrices.filter(
                (ip) =>
                  ip.sku === item?.sku &&
                  order.doorStyle === ip.doorStyle &&
                  order.species === ip.species,
              )[0]?.price ?? item?.price;
            item.pricePerUnit = pricePerUnit;
          }
          return item;
        }),
      );
    },
    [itemPrices, order.doorStyle, order.species],
  );

  useEffect(() => {
    setSelectedItemsAndCalculate(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.doorStyle, order.species, setSelectedItemsAndCalculate]);

  return (
    <FormContext.Provider
      value={{
        order,
        setOrder,
        customer,
        setCustomer,
        selectedItems,
        setSelectedItems: setSelectedItemsAndCalculate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
