import { type FC, type ReactNode } from "react";

export const Label: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <label className="pointer-events-none absolute top-0 block p-1 text-sm text-gray-500">
      {children}
    </label>
  );
};
