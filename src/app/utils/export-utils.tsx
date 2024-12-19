import { Row, Template } from "@/components/sheet";

export const downloadCsv = (
  items: Row[],
  template: Template<Row>,
  fileName: string,
) => {
  const headers = Object.keys(template).map((key) => template[key].label);
  const csv = [headers.join(",")];
  items.forEach((item) => {
    const row = Object.keys(template)
      .map((key) => item[key])
      .join(",");
    csv.push(row);
  });

  const csvString = csv.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.csv`;
  a.click();
};
