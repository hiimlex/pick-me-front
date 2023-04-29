import React from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { InputStyle } from "./styles";

interface CoreInputProps extends Partial<HTMLInputElement> {
  control: Control;
  name: string;
  defaultValue?: string;
  rules?: RegisterOptions;
  inputStyle?: React.CSSProperties;
}

const CoreInput = ({
  type,
  placeholder,
  name,
  control,
  defaultValue,
  rules,
  inputStyle,
  min,
}: CoreInputProps) => {
  const {
    field: { value, ...field },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
    rules,
  });

  const handleOnChange = (e: any) => {
    if (type === "file") {
      field.onChange(e.target.files);
    } else {
      field.onChange(e);
    }
  };

  return (
    <InputStyle
      type={type}
      placeholder={placeholder}
      style={inputStyle}
      min={min}
      {...field}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

export { CoreInput };
