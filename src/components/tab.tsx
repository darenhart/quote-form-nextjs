import { type FC, type ReactNode } from "react";

export const Tab: FC<{
  children: ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}> = ({ children, isSelected, onClick }) => {
  return (
    <button
      className={`px-4 py-2 ${
        isSelected
          ? "-mb-[1px] rounded-t-md border border-b-0 bg-white font-bold"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
