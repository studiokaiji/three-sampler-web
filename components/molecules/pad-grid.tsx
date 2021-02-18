import React from "react";
import Pad from "../atoms/pad";
import WaveForm from "../atoms/waveform";

const PAD_COUNT = 16;

export type PadGridProps = {
  className: string;
  selectedPadClassName: string;
  unselectedPadClassName?: string;
  padIndex: number;
  sampleUrls: string[];
  onDropFile: (file: File, index: number) => void;
  onPressPad: (index: number) => void;
  onPressEndPad: (index: number) => void;
}

export default function PadGrid(props: PadGridProps) {
  const unselectedPadClassName =  props.unselectedPadClassName || "bg-primary-thin";

  const pads: React.ReactNode[] = [];
  for (let i=0; i<PAD_COUNT; i++) {
    pads.push(
      <Pad
        className={(props.padIndex === i ? props.selectedPadClassName : unselectedPadClassName) + " w-24 h-24"}
        key={`sample-pad-${i}`}
        onDropFile={(file) => props.onDropFile(file, i)}
        onMouseDown={() => props.onPressPad(i)}
        onMouseUp={() => props.onPressEndPad(i)}
      >
        {
          props.sampleUrls[i] && <WaveForm url={props.sampleUrls[i]} peakLength={60} className="w-24 h-24" />
        }
      </Pad>
    );
  }

  return (
    <div id="samplepad-grid" className="grid grid-cols-8 gap-3">
      {pads}
    </div>
  );
}
