import { FC, useContext } from "react";
import { Sheet, Row, Template } from "@/components/sheet";
import { DataContext } from "../DataContext";

const name = "Customers";

export type Customer = {
  customerAccountCode: string;
  po: string;
  invoiceTo?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  shipTo: string;
  shipStreet: string;
  shipCity: string;
  shipState: string;
  shipZip: string;
};

export const customerTemplate: Template<Customer> = {
  customerAccountCode: { label: "Customer Account Code" },
  po: { label: "PO" },
  invoiceTo: { label: "Invoice To" },
  street: { label: "Street" },
  city: { label: "City" },
  state: { label: "State" },
  zip: { label: "Zip" },
  phone: { label: "Phone" },
  email: { label: "Email" },
  shipTo: { label: "Ship To" },
  shipStreet: { label: "Ship Street" },
  shipCity: { label: "Ship City" },
  shipState: { label: "Ship State" },
  shipZip: { label: "Ship Zip" },
};

export const initialCustomers: Customer[] = [
  {
    customerAccountCode: "1234",
    po: "PO1234",
    invoiceTo: "John Doe",
    street: "1234 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    phone: "123-456-7890",
    email: "example@email.com",
    shipTo: "Jane Doe",
    shipStreet: "1234 Main St",
    shipCity: "Anytown",
    shipState: "CA",
    shipZip: "12345",
  },
  {
    customerAccountCode: "5678",
    po: "PO5678",
    invoiceTo: "Jane Doe",
    street: "5678 Main St",
    city: "Anytown2",
    state: "CA",
    zip: "54321",
    phone: "543-765-1234",
    email: "test@email.com",
    shipTo: "John Doe",
    shipStreet: "5678 Main St",
    shipCity: "Anytown2",
    shipState: "CA",
    shipZip: "12345",
  },
];

export const emptyCustomer: Customer = Object.fromEntries(
  Object.keys(customerTemplate).map((key) => [key, ""]),
) as Customer;

export const CustomersSheet: FC = () => {
  const { customers, setCustomers } = useContext(DataContext);

  return (
    <Sheet
      name={name}
      initialItems={initialCustomers}
      template={customerTemplate}
      items={customers}
      onItemsChange={(items: Row[]) => setCustomers(items as Customer[])}
    />
  );
};
