import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  [name: string]: any;
};

export function Button(props: ButtonProps) {
  const { children, className, disabled, fullWidth, ...rest } = props;

  const classes = classNames([
    "px-4 py-3 rounded-md bg-indigo-800 text-white",
    {
      "w-full": fullWidth,
    },
    className,
  ]);
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  disabled: false,
  fullWidth: false,
};
