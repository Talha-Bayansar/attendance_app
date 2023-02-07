import React, { useState } from "react";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  value?: any;
  isActive?: boolean;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.LegacyRef<HTMLInputElement>;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

export const InputField = ({
  id,
  label,
  placeholder = "",
  type = "text",
  className,
  value,
  isActive,
  name,
  onChange,
  onFocus,
  onBlur,
  ref,
  inputProps,
}: Props) => {
  const [active, setActive] = useState(value || isActive ? true : false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onFocus) {
      onFocus(e);
    }
    const target = e.target;
    setActive(true);
    target.setAttribute("placeholder", target.getAttribute("data-placeholder"));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur) {
      onBlur(e);
    }
    const target = e.target;
    if (!target.value) {
      setActive(false);
    }
    target.removeAttribute("placeholder");
  };

  return (
    <div
      id={id}
      className={`${
        className ?? ""
      } relative rounded-lg px-4 py-4 shadow-small`}
    >
      <label
        htmlFor={`${id}_${label}`}
        className={`absolute origin-top-left translate-x-0 text-gray-400 transition-all ${
          active ? "translate-y-[-1rem] scale-75" : "translate-y-0 scale-100"
        }`}
      >
        {label}
      </label>
      <input
        id={`${id}_${label}`}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        type={type}
        value={value}
        {...inputProps}
        onChange={onChange}
        data-placeholder={placeholder}
        className="w-full outline-none"
      />
    </div>
  );
};
