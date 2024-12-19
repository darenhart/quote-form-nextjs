"use client";

import { useState } from "react";
import { Tab } from "@/components/tab";
import { CustomersSheet } from "./features/customers";
import { Form } from "./features/form/form";
import { ModTableSheet } from "./features/modTable";
import { ItemsSheet } from "./features/items";
import { ItemPricesSheet } from "./features/itemPrices";
import { FormProvider } from "./FormContext";
import { DataContext, DataProvider } from "./DataContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("form");

  const pages = [
    {
      id: "form",
      label: "Standard Order Form",
      component: <Form />,
    },
    {
      id: "customers",
      label: "Customers",
      component: <CustomersSheet />,
    },
    {
      id: "items",
      label: "Items",
      component: <ItemsSheet />,
    },
    {
      id: "item-prices",
      label: "Item Prices",
      component: <ItemPricesSheet />,
    },
    {
      id: "mod-table",
      label: "ModTable",
      component: <ModTableSheet />,
    },
  ];

  return (
    <DataProvider>
      <FormProvider>
        <div className="flex h-screen flex-col">
          <div className="flex border-b bg-gray-50 px-4 pt-4 print:hidden">
            <div className="flex pl-4 pr-14 text-2xl">
              Quick Quote
              <span className="ml-2 text-xs font-normal text-gray-500">
                alpha
              </span>
            </div>
            {pages.map((page) => (
              <Tab
                key={page.id}
                isSelected={activeTab === page.id}
                onClick={() => setActiveTab(page.id)}
              >
                {page.label}
              </Tab>
            ))}
          </div>

          <div className="flex-1 overflow-auto print:overflow-visible">
            {pages.map((page) =>
              activeTab !== page.id ? null : (
                <div key={page.id}>{page.component}</div>
              ),
            )}
          </div>
        </div>
      </FormProvider>
    </DataProvider>
  );
}
