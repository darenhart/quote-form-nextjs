import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Col: FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={twMerge("grid w-full grid-flow-row divide-y", className)}>
      {children}
    </div>
  );
};
