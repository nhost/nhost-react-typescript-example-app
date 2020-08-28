import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  [name: string]: any;
};

export function Button({ children, ...rest }: ButtonProps) {
  return <button>{children}</button>;
}

Button.defaultProps = {
  className: "",
  disabled: false,
};
