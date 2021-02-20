import React from "react";
import RangeSlider from "./range-slider";
import VerticalSlideBar from "../atoms/vertical-silde-handle";
import Waveform, { WaveformProps } from "../atoms/waveform";

export type WaveformEditorProps = {
  min: number;
  max: number;
  start: number;
  end: number;
} & WaveformProps

export default function WaveformEditor(props: WaveformEditorProps) {
  return (
    <div {...props}>
      <div className="h-full relative">
        <RangeSlider className="w-full h-full absolute" domain={[0, 100]} value={[20, 80]} onChangeValue={(value) => console.log(value)} />
        <Waveform className="h-full" url={props.url} peakLength={props.peakLength} />
      </div>
    </div>
  );
}
