import { FC, InputHTMLAttributes, useContext, useState } from "react";
import { Customer, customerTemplate } from "../customers";
import { SearchableCombobox } from "@/components/searchable-combobox";
import { FormItems } from "./formItems";
import { Select } from "@/components/select";
import { InputProps, Input } from "@/components/input";
import Image from "next/image";
import { Row } from "@/components/Row";
import { Col } from "@/components/Col";
import { Label } from "@/components/label";
import { FormContext, Order, orderTemplate } from "@/app/FormContext";
import { DataContext } from "@/app/DataContext";

export const Form: FC<{}> = ({}) => {
  const [selectedCustomerAccountCode, setSelectedCustomerAccountCode] =
    useState<string>("");

  const { order, setOrder, customer, setCustomer, selectedItems } =
    useContext(FormContext);
  const { customers } = useContext(DataContext);

  const CustomerInput = (
    prop: keyof Customer,
    inputProps?: InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <Input
      {...inputProps}
      label={customerTemplate[prop]?.label}
      value={customer[prop]}
      onChangeValue={(val) => setCustomer((prev) => ({ ...prev, [prop]: val }))}
    />
  );

  const OrderInput = (prop: keyof Order, props?: InputProps) => (
    <Input
      {...props}
      label={orderTemplate[prop]?.label}
      value={order[prop]}
      onChangeValue={(val) => setOrder((prev) => ({ ...prev, [prop]: val }))}
    />
  );

  const OrderSelect = (
    prop: keyof Order,
    options: { value: string; label: string }[],
  ) => (
    <Select
      label={orderTemplate[prop]?.label}
      options={options}
      value={order[prop]}
      onChange={(value) => setOrder((prev) => ({ ...prev, [prop]: value }))}
    />
  );

  return (
    <main className="m-auto my-4 min-w-[1200px] max-w-screen-xl divide-y-4 overflow-auto border-4 border-[#3b7739] bg-[#c5d6c4]/80 text-formBase print:m-0 print:p-0">
      {/* Header */}
      <Row>
        <div className="flex flex-col items-center gap-2 p-2">
          <Image
            src="/vercel.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-32"
          />
          <h1 className="text-center text-lg font-bold">Standard Order Form</h1>
        </div>
        <div className="p-1"></div>
        <div className="p-1">
          <p>
            Office Use Only
            <br /> Q CODE
          </p>
        </div>
        <Col>
          <Row>Start Here:</Row>
          <Row>
            <div>Order Date</div>
            <div>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </Row>
          <Row>Page X of X</Row>
        </Col>
      </Row>

      {/* Original Order */}
      <Row>
        <Col>
          <div className="p-1">
            Please do not use this box for shortages, or concealed damage
            replacements
          </div>
          <Row>
            <Col>
              {OrderInput("originalOrder")}
              {OrderInput("originalPo")}
            </Col>
            <ul className="list-disc pl-6 text-sm">
              <li>
                Warranty orders require field inspection and a signed
                authorization from our sales rep
              </li>
              <li>
                All defective product replacement orders will be scheduled to
                produce on the next WFEX date of order placement (excludes
                purchased doors)
              </li>
              <li>All orders will be scheduled on a WF truck or UPS</li>
            </ul>
          </Row>
        </Col>
        <Col className="max-w-[30vw]">
          {OrderInput("originalOrderId")}
          <p className="p-2">
            No charge if notified within 30 days of original invoice date
          </p>
        </Col>
      </Row>

      {/* Customer Information */}
      <div className="divide-y">
        <Row>
          <Select
            label="Shipping Method"
            options={[
              {
                value: "standardshippingcycletruck",
                label: "Standard Shipping - Cycle Truck",
              },
              {
                value: "standardshippingups",
                label: "Standard Shipping - UPS",
              },
              { value: "wfxups", label: "WFEX - UPS + 20%" },
              { value: "wfxtruck", label: "WFEX - Truck + 20%" },
              { value: "wfxltl", label: "WFEX - LTL + 20%" },
              { value: "customerpickup", label: "Customer Pickup" },
            ]}
            value="default"
            onChange={(value) => {}}
          />
          <div className="col-span-1">{OrderInput("promoCode")}</div>
          <div className="col-span-2">{OrderInput("residenceCode")}</div>
        </Row>
        <Row>
          <SearchableCombobox
            label="Customer Account Code"
            value={selectedCustomerAccountCode}
            onChange={(customerAccountCode) => {
              setSelectedCustomerAccountCode(customerAccountCode);
              const selectedCustomer = customers.find(
                (customer) =>
                  customer.customerAccountCode === customerAccountCode,
              );
              if (selectedCustomer) {
                setCustomer(selectedCustomer);
              }
            }}
            options={customers.map((customer) => ({
              label: `${customer.customerAccountCode} - ${customer.invoiceTo} - ${customer.po}`,
              value: customer.customerAccountCode,
            }))}
          />
          {CustomerInput("po")}
          {OrderInput("tag")}
        </Row>
        <Row>
          {CustomerInput("invoiceTo")}
          {OrderInput("designerName")}
          {OrderInput("id")}
        </Row>
      </div>

      {/* Customer Address */}
      <div className="flex w-full divide-x">
        <Col>
          {CustomerInput("street")}
          {CustomerInput("city")}
          <Row>
            {CustomerInput("state")}
            {CustomerInput("zip")}
          </Row>
          {CustomerInput("phone", { type: "phone" })}
          {CustomerInput("email", { type: "email" })}
        </Col>

        <Col>
          <div className="p-2">
            Note: Enter SAME if shipping address is the same as billing address.
          </div>
          {CustomerInput("shipTo")}
          {CustomerInput("shipStreet")}
          {CustomerInput("shipCity")}
          <Row>
            {CustomerInput("shipState")}
            {CustomerInput("shipZip")}
          </Row>
        </Col>
      </div>

      {/* Order Information */}
      <Col>
        <Row>
          {OrderSelect("seriesBoxConstruction", [
            { value: "classic", label: "Classic" },
            { value: "supreme", label: "Supreme" },
            { value: "elite", label: "Elite" },
          ])}
          {OrderSelect("species", [
            { value: "cherry", label: "Cherry" },
            { value: "hickory", label: "Hickory" },
            { value: "maple", label: "Maple" },
            { value: "oak", label: "Oak" },
            { value: "quarterwhiteoak", label: "Quarter White Oak" },
            { value: "rusticmaple", label: "Rustic Maple" },
            { value: "rusticoak", label: "Rustic Oak" },
            { value: "mdf", label: "MDF" },
          ])}
          {OrderSelect("doorStyle", [
            { value: "vail", label: "Vail" },
            { value: "boston", label: "Boston" },
            { value: "bostonraisedpanel", label: "Boston Raised Panel" },
            { value: "chesapeake", label: "Chesapeake" },
            { value: "chiswick", label: "Chiswick" },
            { value: "destin", label: "Destin" },
            { value: "hamilton", label: "Hamilton" },
            { value: "hamiltonraisedpanel", label: "Hamilton Raised Panel" },
            { value: "hartford", label: "Hartford" },
            { value: "knoxville", label: "Knoxville" },
            {
              value: "knoxvilleraisedpanel",
              label: "Knoxville Raised Panel",
            },
            { value: "lincolnroad", label: "Lincoln Road" },
            { value: "madison", label: "Madison" },
            { value: "monterey", label: "Monterey" },
            { value: "outerbanks", label: "Outer Banks" },
            { value: "santafe", label: "Santa Fe" },
            { value: "santaferaisedpanel", label: "Santa Fe Raised Panel" },
            { value: "shelby", label: "Shelby" },
            { value: "sonoma", label: "Sonoma" },
            { value: "waverly", label: "Waverly" },
            { value: "auburnplains", label: "Auburn Plains" },
          ])}
          {OrderSelect("finish", [
            { value: "stainonly", label: "Stain - Only" },
            { value: "stainglazed", label: "Stain - Glazed + 10%" },
            { value: "stainheirloom", label: "Stain - Heirloom + 30%" },
            {
              value: "stainyourcolor",
              label: "Stain - YourColor + 40% + Setup Fee",
            },
            { value: "paintonlymarkup", label: "Paint - Only + 15%" },
            { value: "paintonly", label: "Paint - Only" },
            { value: "paintglazed", label: "Paint - Glazed + 20%" },
            {
              value: "paintbrushedglazed",
              label: "Paint - Brushed Glaze + 30%",
            },
            { value: "paintheirloom", label: "Paint - Heirloom + 30%" },
            { value: "paintsoutherly", label: "Paint - Southerly + 20%" },
            { value: "unfinished", label: "Unfinished" },
          ])}
        </Row>
        <Row>
          {OrderSelect("hinge", [
            {
              value: "softclosehinge",
              label: "Soft-Close Hinge is included",
            },
          ])}
          {OrderSelect("fivePieceDrawerFront", [
            {
              value: "standarddrawerfront",
              label: "Keep Standard Drawer Front",
            },
            {
              value: "addfivepiecefront",
              label: "Add 5 Piece Front @ $100 per drawer",
            },
          ])}

          {OrderInput("colorCode")}
        </Row>
        <Row>
          {OrderSelect("drawerGuideOption", [
            {
              value: "fullextsoftclosedtcdrwguide",
              label: "Drawer Guide Option",
            },
          ])}
          {OrderInput("colorDescription")}
        </Row>
        <Row className="grid-cols-[5fr,3fr,3fr,3fr]">
          <Col></Col>
          <Col>
            <Row className="flex items-center">
              <div className="w-36 px-2">{orderTemplate.multiplier?.label}</div>
              <Input
                type="number"
                value={order.multiplier}
                onChangeValue={(val) =>
                  setOrder((prev) => ({ ...prev, multiplier: val }))
                }
              />
            </Row>
            <Row className="flex items-center">
              <div className="w-36 px-2">
                {orderTemplate.salesTaxRate?.label}
              </div>
              <Input
                type="number"
                value={order.salesTaxRate}
                onChangeValue={(val) =>
                  setOrder((prev) => ({ ...prev, salesTaxRate: val }))
                }
              />
            </Row>
            <Row className="flex items-center">
              <div className="w-36 px-2">
                {orderTemplate.freightRate?.label}
              </div>
              <Input
                type="number"
                value={order.freightRate}
                onChangeValue={(val) =>
                  setOrder((prev) => ({ ...prev, freightRate: val }))
                }
              />
            </Row>
          </Col>
          <Col>
            <div className="flex justify-between p-2">
              <div className="space-y-[11px]">
                <div>Your Color Charge</div>
                <div>Sales Tax Total</div>
                <div>Total Freight per/Cab</div>
              </div>
              <div className="space-y-[11px]">
                <div>$ -</div>
                <div>$ -</div>
                <div>$ -</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="flex justify-between p-2">
              <div className="space-y-[11px]">
                <div>0</div>
                <div>Total Item Cost</div>
                <div>
                  <strong>Grand Total</strong>
                </div>
              </div>
              <div className="space-y-[11px]">
                <div>$ -</div>
                <div>$ -</div>
                <div>
                  ${" "}
                  {selectedItems.reduce(
                    (acc, item) => acc + (item?.pricePerUnit ?? 0),
                    0,
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>

      <FormItems />

      <Row>
        <div className="relative pt-5">
          <Label>Comments</Label>
          <textarea name="comments" cols={70} />
        </div>
        <div className="flex justify-between space-x-1 p-2">
          <div>
            <div>-</div>
            <div>-</div>
            <div> Count: -</div>
            <div>0</div>
            <div>-</div>
          </div>
          <div>
            <div>Total Item Cost</div>
            <div>YourColor Charge</div>
            <div>x Freight Rate</div>
            <div>--</div>
            <div>Sales Tax</div>
          </div>
          <div>
            <div>-</div>
            <div>-</div>
            <div>$ -</div>
            <div>0%</div>
            <div>-</div>
          </div>
          <div>
            <div>$ -</div>
            <div>$ -</div>
            <div>$ -</div>
            <div>$ -</div>
            <div>$ -</div>
          </div>
        </div>
      </Row>
      <Row>
        <div className="p-2">
          ******* Check Order Total with Confirmation for final Pricing******
        </div>
        <div className="flex justify-end gap-4 p-3">
          <strong>Grand Total</strong>
          <strong>
            R${" "}
            {selectedItems.reduce(
              (acc, item) => acc + (item?.pricePerUnit ?? 0),
              0,
            )}
          </strong>
        </div>
      </Row>
      <Row>
        <div className="p-2">
          
        </div>
        <div className="p-2">
          <div>
            ---
          </div>
          <div className="flex items-center justify-between">
            <div>---</div>
            <div className="mt-5">
              <div className="mt-5">
                _______________________________________________
              </div>
              <div>Authorized Signature</div>
            </div>
          </div>
        </div>
      </Row>
    </main>
  );
};
