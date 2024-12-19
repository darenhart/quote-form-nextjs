import { FC, useCallback, useState } from "react";
import { Dropzone } from "@/components/dropzone";
import { handleFileChange } from "../app/utils/import-utils";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { downloadCsv } from "@/app/utils/export-utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export type Row = {
  [key: string]: any;
};

export type Template<T> = {
  [Property in keyof T]: {
    label: string;
  };
};

interface SheetPageProps<T> {
  name: string;
  template: Template<T>;
  initialItems: T[];
  items: T[];
  onItemsChange: (items: T[]) => void;
}

export const Sheet: FC<SheetPageProps<Row>> = ({
  name,
  template,
  initialItems,
  items,
  onItemsChange: setItems,
}) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const onFileChange = useCallback(
    async (fileList: FileList | null) => {
      try {
        if (!fileList) return;
        const json = await handleFileChange(fileList);
        const newItems: Row[] = json.map((item) => {
          let newItem: Row = {};
          Object.keys(template).forEach((key) => {
            newItem[key] = item[template[key].label];
          });
          return newItem;
        });
        setItems(newItems);
        setIsUploadOpen(false);
      } catch (e: any) {
        alert(e.message);
      }
    },
    [setItems, template],
  );

  return (
    <div className="m-5">
      {!isUploadOpen && <Dropzone onFileChange={onFileChange} invisible />}

      <div className="p-4">
        <div className="flex gap-5">
          <button
            onClick={() => setIsUploadOpen(!isUploadOpen)}
            className="flex gap-2"
          >
            <ArrowUpTrayIcon className="h-6 w-6" />
            Upload
          </button>
          <button
            onClick={() => downloadCsv(items, template, name)}
            className="flex gap-2"
          >
            <ArrowDownTrayIcon className="h-6 w-6" />
            Download
          </button>
        </div>
        <div
          className={`absolute mr-5 mt-5 rounded-lg border bg-gray-50 shadow-xl ${
            isUploadOpen ? "" : "hidden"
          }`}
        >
          <div className="flex flex-wrap gap-6 p-8">
            <button
              className="absolute right-3 top-3"
              onClick={() => setIsUploadOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <Dropzone onFileChange={onFileChange} />
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 rounded-md bg-amber-100 p-2 text-gray-700">
                <ExclamationTriangleIcon className="h-6 w-6" />
                This is an alpha version. Please make sure to backup your data.
              </div>
              <p>The file should contain the following columns:</p>
              <div className="flex flex-wrap items-center gap-4">
                <ul>
                  {Object.keys(template).map((col) => (
                    <li key={col}>{template[col].label}</li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    downloadCsv(initialItems, template, `${name}-template`)
                  }
                  className="text-md flex gap-2"
                >
                  <ArrowDownTrayIcon className="h-6 w-6" />
                  Download template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(template).map((col) => (
              <th key={col} className="border bg-gray-100 p-2">
                {template[col].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border">
              {Object.keys(template).map((col) => (
                <td key={`${col}-${index}`} className="border p-1">
                  {item[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
