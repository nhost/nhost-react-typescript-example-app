import React from "react";
import classNames from "classnames";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  [name: string]: any;
};

export function Main(props: LayoutProps) {
  const { children, className } = props;

  const classes = classNames(["container mx-auto", className]);

  return <div className={classes}>{children}</div>;
}
