import { type FC, Fragment, useState, useEffect, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Label } from "./label";
import { twMerge } from "tailwind-merge";

function normalizeCharacters(string: string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type Option = {
  label: string | ((query: string) => string);
  value: string;
};

type RawOption = {
  label: string;
  value: string;
};

export const SearchableCombobox: FC<{
  value: string | undefined | null;
  onChange: (v: string, query: string) => void;
  options: Readonly<Option[]>;
  defaultBottomOptions?: Readonly<Option[]>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}> = ({
  value,
  onChange,
  options,
  defaultBottomOptions = [],
  disabled,
  placeholder = "Search",
  label,
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((result) => {
          return normalizeCharacters(
            typeof result.label === "function"
              ? result.label(query)
              : result.label,
          )
            .toLowerCase()
            .includes(normalizeCharacters(query).toLowerCase());
        });

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Combobox
      value={value}
      onChange={(v) => onChange(v as string, query)}
      disabled={disabled}
    >
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden text-left sm:text-sm">
          <Label>{label}</Label>
          <Combobox.Button className="w-full" as="div">
            <Combobox.Input
              ref={ref}
              className={twMerge(
                `w-full bg-transparent pb-2 pl-3 pr-10 hover:bg-gray-100/20  focus:border-gray-400  focus:outline-none`,
                label ? "pt-6" : "pt-2",
              )}
              displayValue={(v) => {
                const label = options.find((o) => o.value === v)?.label;
                if (label) {
                  return typeof label === "function" ? label(query) : label;
                }
                return value ?? query;
              }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
          </Combobox.Button>
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full divide-y overflow-auto rounded-md bg-white py-1 text-gray-900 shadow-md">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboOption
                  key={option.value}
                  option={{
                    ...option,
                    label:
                      typeof option.label === "function"
                        ? option.label(query)
                        : option.label,
                  }}
                />
              ))
            )}
            {defaultBottomOptions
              .filter((option) =>
                typeof option.label === "function"
                  ? option.label(query)
                  : option.label,
              )
              .map((option) => (
                <ComboOption
                  key={option.value}
                  option={{
                    ...option,
                    label:
                      typeof option.label === "function"
                        ? option.label(query)
                        : option.label,
                  }}
                />
              ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

const ComboOption: FC<{
  option: RawOption;
}> = ({ option }) => {
  return (
    <Combobox.Option
      className={({ active }) =>
        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
          active ? "bg-gray-100 text-gray-900" : "text-gray-500"
        }`
      }
      value={option.value}
    >
      {({ selected, active }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {option.label}
          </span>
          {selected ? (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3`}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Combobox.Option>
  );
};
