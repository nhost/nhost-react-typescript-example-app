import React from "react";

type AvatarProps = {
  children: JSX.Element | string;
};

export function Avatar({ children }: AvatarProps) {
  return <div>Avatar.. {children}</div>;
}
