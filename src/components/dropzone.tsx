import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState, type FC, useEffect } from "react";

const ImportAcceptFileTypes =
  ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";

export const Dropzone: FC<{
  name?: string;
  accept?: string;
  description?: string;
  onFileChange?: (file: FileList | null) => void;
  invisible?: boolean;
}> = ({
  name = "file-upload",
  accept = ImportAcceptFileTypes,
  description = "Formats: csv, xlsx, xls",
  onFileChange,
  invisible,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleWindowDragOver = (event: DragEvent) => {
      event.preventDefault(); // This is important to allow a drop
      setHidden(false); // Show the dropzone or make it interactive
    };

    const handleWindowDrop = (event: DragEvent) => {
      event.preventDefault(); // Prevent the browser's default file open behavior
      setHidden(true); // Optionally hide the dropzone again or reset state
    };

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragleave", handleWindowDrop);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragleave", handleWindowDrop);
    };
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeaveOrDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      className={
        invisible
          ? `${
              !hidden ? "opacity-100" : "pointer-events-none opacity-0"
            } absolute h-[80vh] w-[90vw] rounded-lg  border border-green-700 bg-green-200 bg-opacity-25 transition-opacity`
          : "flex items-center"
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeaveOrDrop}
      onDrop={async (event) => {
        handleDragLeaveOrDrop(event);
        if (onFileChange) {
          await onFileChange(event.dataTransfer.files);
        }
      }}
    >
      {invisible ? null : (
        <label htmlFor={name} className="min-w-fit">
          <div
            className={`flex h-72 w-80 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 ${
              isDragOver
                ? "border-gray-300 bg-green-400 bg-opacity-20"
                : "hover:border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ArrowUpTrayIcon className="h-10 w-10 text-gray-500" />
            <p className="my-8 text-center text-lg font-semibold">
              Drag your file here or click to upload
            </p>
            {description && (
              <p className="text-brand-supportive-dark text-sm">
                {description}
              </p>
            )}
          </div>
        </label>
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept={accept ?? undefined}
        hidden
        onClick={(e) => (e.currentTarget.value = "")}
        onChange={async (event) => {
          if (onFileChange) {
            await onFileChange(event.target.files);
          }
        }}
      />
    </div>
  );
};
