import React from "react";

export type PadProps = {
  className?: string;
  children: React.ReactNode;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Pad(props: PadProps) {
  const mouseDowned = () => {
    setTimeout(props.onHoldStart);
  }

  return (
    <button
      className={`w-24 h-24 focus:outline-none ${props.className}`}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      {props.children}
    </button>
  );
}
