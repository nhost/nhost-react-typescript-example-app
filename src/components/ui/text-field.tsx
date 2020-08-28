import React from "react";

type TextFieldProps = {
  type: string;
  disabled?: boolean;
  className?: string;
  [name: string]: any;
};

export function TextField(props: TextFieldProps) {
  const { type, disabled, className, fullWidth, ...rest } = props;

  return <input type={type} disabled={disabled} {...rest} />;
}

TextField.defaultProps = {
  type: "text",
  disabled: false,
  className: "",
};
