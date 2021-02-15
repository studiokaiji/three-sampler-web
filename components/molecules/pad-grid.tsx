import React from "react";
import Pad from "../atoms/pad";

const PAD_COUNT = 16;

export type PadGridProps = {
  className: string;
  selectedPadClassName: string;
  unselectedPadClassName?: string;
  padIndex: number;
  onSelectPad: (index: number) => void;
}

export default function PadGrid(props: PadGridProps) {
  const unselectedPadClassName =  props.unselectedPadClassName || "bg-primary-thin";

  const pads: React.ReactNode[] = [];
  for (let i=0; i<PAD_COUNT; i++) {
    pads.push(
      <Pad
        className={props.padIndex === i ? props.selectedPadClassName : unselectedPadClassName}
        onClick={() => props.onSelectPad(i)}
      >
        <p>{i}</p>
      </Pad>
    );
  }

  return (
    <div className="grid grid-cols-8 gap-3">
      {pads}
    </div>
  );
}
