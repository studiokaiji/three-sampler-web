import React from "react";
import RangeSlider from "./molecules/range-slider";
import Waveform, { WaveformProps } from "./atoms/waveform";
import { Sample } from "../pages/sampler/sample";

export type WaveformEditorProps = {
  min?: number;
  max?: number;
  sample?: Sample;
  onChangeValue: (sample: Sample) => void;
} & WaveformProps

export default function WaveformEditor(props: WaveformEditorProps) {
  const min = props.min || 0;
  const max = props.max || 100;

  const sample = props.sample;
  if (!sample) return <div {...props} />

  const changedRangeSliderValue = ([start, end]: [number, number] = [min, max]) => {
    sample.start = start;
    sample.end = end;
    props.onChangeValue(sample);
  };

  return (
    <div {...props}>
      <div className="h-full relative">
        <RangeSlider
          className="w-full h-full absolute"
          validRangeColor="bg-blue-500"
          domain={[min, max]}
          value={[sample.start, sample.end]}
          onChangeValue={changedRangeSliderValue}
        />
        <Waveform className="h-full" url={props.url} peakLength={props.peakLength} />
      </div>
    </div>
  );
}
