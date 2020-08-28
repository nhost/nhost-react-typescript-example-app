import React from "react";
import classNames from "classnames";
import { Header } from "components/app/header";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  [name: string]: any;
};

export function Layout(props: LayoutProps) {
  const { children, className } = props;

  const classes = classNames([className]);

  return (
    <div className={classes}>
      <Header />
      {children}
    </div>
  );
}
