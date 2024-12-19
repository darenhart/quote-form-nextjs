import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Row: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={twMerge("grid w-full grid-flow-col divide-x", className)}>
      {children}
    </div>
  );
};
