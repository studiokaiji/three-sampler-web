import React from "react";
import { GetTrackProps, SliderItem } from "react-compound-slider";

type SlideTrackProps = {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  className: string;
};

export default function SlideTrack(props: SlideTrackProps) {
  return (
    <div
      className={"absolute h-full " + props.className}
      style={{
        left: `${props.source.percent}%`,
        width: `${props.target.percent - props.source.percent}%`
      }}
    />
  );
}
