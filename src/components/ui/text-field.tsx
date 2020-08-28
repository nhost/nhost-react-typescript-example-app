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
    "py-2 px-4 border border-gray-600 rounded",
    "outline-none focus:border-indigo-600 focus:shadow-md",
    "transition easy-in-out duration-300",
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
