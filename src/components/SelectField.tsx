import React, { type ChangeEvent } from "react";
import { Combobox } from "@headlessui/react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { EmptyState } from "./EmptyState";

type Props<T> = {
  label: string;
  name: string;
  query: string;
  data: T[];
  selectedData: T[];
  onChangeData: (element: T[]) => void;
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SelectField = <T,>({
  label,
  name,
  query,
  data,
  selectedData,
  onChangeData,
  onChangeQuery,
}: Props<T>) => {
  return (
    <Combobox value={selectedData} onChange={onChangeData} multiple>
      <div className={`relative rounded-lg px-4 py-4 shadow-small`}>
        <label
          htmlFor={name}
          className={`absolute origin-top-left translate-x-0 text-gray-400 transition-all ${
            query || selectedData.length > 0
              ? "translate-y-[-1rem] scale-75"
              : "translate-y-0 scale-100"
          }`}
        >
          {label}
        </label>
        <Combobox.Input
          name={name}
          className="w-full outline-none"
          value={query}
          onChange={onChangeQuery}
          placeholder={selectedData
            .map((element) => (element as any)?.name as string)
            .join(", ")}
        />
        <Combobox.Button className="absolute inset-y-0 right-2 flex items-center">
          <HiOutlineChevronUpDown size={24} />
        </Combobox.Button>
      </div>
      <Combobox.Options className="flex max-h-52 flex-col overflow-y-scroll rounded-md shadow-small">
        {data.length > 0 ? (
          data.map((element) => (
            <Combobox.Option
              className={`p-2 ${
                selectedData.find(
                  (el) => (el as any).id === (element as any).id
                )
                  ? "bg-secondary-transparent"
                  : ""
              }`}
              key={(element as any)?.id}
              value={element}
            >
              {(element as any)?.name}
            </Combobox.Option>
          ))
        ) : (
          <EmptyState className="m-4" text="No users found." />
        )}
      </Combobox.Options>
    </Combobox>
  );
};
