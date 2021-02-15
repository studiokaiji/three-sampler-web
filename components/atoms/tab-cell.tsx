import React from "react";

export type TabCellProps = {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function TabCell (props: TabCellProps) {
  return (
    <button
      className={`w-36 h-12 font-bold focus:outline-none ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
