import { InputHTMLAttributes, type FC, type ReactNode } from "react";
import { Label } from "./label";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChangeValue: (value: string) => void;
  label?: ReactNode;
  variant?: "default" | "horizontal";
};

export const Input: FC<InputProps> = ({ label, onChangeValue, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };
  return (
    <div className="relative">
      <Label>{label}</Label>
      <input
        {...props}
        onChange={handleChange}
        className={twMerge(
          "h-full w-full bg-transparent px-2 pb-2 pt-6 hover:bg-gray-100/20  focus:border-gray-400  focus:outline-none",
          label ? "pt-6" : "pt-2",
        )}
      />
    </div>
  );
};
