import React from "react";
import classNames from "classnames";

type TextFieldProps = {
  type: string;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  [name: string]: any;
};

export function TextField(props: TextFieldProps) {
  const { type, disabled, className, fullWidth, ...rest } = props;

  const classes = classNames([
    "py-2 px-4 border rounded",
    {
      "w-full": fullWidth,
    },
    className,
  ]);

  return (
    <input type={type} className={classes} disabled={disabled} {...rest} />
  );
}

TextField.defaultProps = {
  type: "text",
  disabled: false,
  fullWidth: false,
  className: "",
};
