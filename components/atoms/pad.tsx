import React from "react";

export type PadProps = {
  className?: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

export default function Pad(props: PadProps) {
  const mouseDowned = () => {
    setTimeout(props.onHoldStart, 200);
  }

  return (
    <button
      className={`w-24 h-24 focus:outline-none ${props.className}`}
      onClick={props.onClick}
      onMouseDown={mouseDowned}
      onMouseUp={props.onHoldEnd}
    >
      {props.children}
    </button>
  );
}
