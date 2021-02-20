import React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import SlideTrack from "../atoms/slide-track";
import VerticalSlideHandle from "../atoms/vertical-silde-handle";

export type RangeSliderProps = JSX.IntrinsicElements["div"] & {
  domain: [number, number]
  value: [number, number];
  step?: number;
  onChangeValue: (value: number[]) => void;
} ;

export default function RangeSlider(props: RangeSliderProps) {
  return (
    <div {...props}>
      <Slider
        className="w-full h-ful"
        mode={1}
        domain={props.domain}
        values={props.value}
      >
        <Rail>
          {({ getRailProps }) => (
            <div className={props.className} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <VerticalSlideHandle
                  key={handle.id}  
                  domain={props.domain}
                  getHandleProps={getHandleProps}
                  handle={handle}
                  barBgColor="bg-blue-500"
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <SlideTrack
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  className="bg-opacity-20 bg-blue-500"
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
}
