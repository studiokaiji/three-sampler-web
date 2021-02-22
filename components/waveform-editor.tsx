import React from "react";
import RangeSlider from "./molecules/range-slider";
import Waveform from "./atoms/waveform";
import { Sample } from "../pages/sampler/sample";

export type WaveformEditorProps = {
  min?: number;
  max?: number;
  sample?: Sample;
  onChangeValue: (sample: Sample) => void;
} & React.HTMLAttributes<HTMLDivElement>

export default function WaveformEditor(props: WaveformEditorProps) {
  const sample = props.sample;
  if (!sample) return <div {...props} />;

  const min = props.min || 0;
  const max = props.max || 100;

  const changedRangeSliderValue = ([start, end]: [number, number] = [min, max]) => {
    sample.changeValidRange(start, end)
      .then(() => props.onChangeValue(sample))
      .catch((err) => console.error(err));
  };

  return (
    <div {...props}>
      <div className="h-full relative">
        <RangeSlider
          className="w-full h-full absolute"
          validRangeColor="bg-blue-500"
          domain={[min, max]}
          value={[sample.startSec, sample.endSec]}
          onChangeValue={changedRangeSliderValue}
        />
        <Waveform
          className="h-full"
          url={sample.originalAudioUrl}
          peakLength={1000}
        />
      </div>
    </div>
  );
}
