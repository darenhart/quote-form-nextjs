import { type FC, type ReactNode } from "react";
import { Label } from "./label";

export const Select: FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: ReactNode;
}> = ({ options, value, onChange, label }) => {
  return (
    <div className="relative h-full">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full cursor-pointer bg-transparent px-2 pb-2 pt-6 hover:bg-gray-100/20  focus:border-gray-400  focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
