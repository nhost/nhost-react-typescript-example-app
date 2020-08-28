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
    "px-4 py-2 rounded-md bg-indigo-600 text-white uppercase",
    {
      "w-full": fullWidth,
      "opacity-50": disabled,
      "cursor-not-allowed": disabled,
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
