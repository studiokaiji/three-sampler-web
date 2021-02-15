import React from "react";

export type PadProps = {
  className?: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Pad(props: PadProps) {
  return (
    <button
      className={`w-24 h-24 focus:outline-none ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
