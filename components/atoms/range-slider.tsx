import React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import SlideTrack from "./slide-track";
import VerticalSlideHandle from "./vertical-silde-handle";

export type RangeSliderProps = JSX.IntrinsicElements["div"] & {
  domain: [number, number]
  value: [number, number];
  validRangeColor: string;
  onChangeValue: (value: [number, number]) => void;
};

export default function RangeSlider(props: RangeSliderProps) {
  const changedSliderValue = (values: readonly number[]) => {
    if (values.length !== 2) throw Error("value.length is should be 2.");
    props.onChangeValue(values as [number, number]);
  }

  return (
    <div {...props}>
      <Slider
        className="w-full h-ful"
        mode={3}
        domain={props.domain}
        values={props.value}
        onChange={changedSliderValue}
      >
        <Rail>
          {({ getRailProps }) => (
            <div className={props.className} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="invisible-slider-handles">
              {handles.map((handle) => (
                <div
                  key={handle.id}
                  className="absolute h-full -ml-1"
                  role="slider"
                  aria-valuemin={props.domain[0]}
                  aria-valuemax={props.domain[1]}
                  aria-valuenow={props.value}
                  style={{
                    left: `${handle.percent}%`
                  }}
                  {...getHandleProps(handle.id)}
                >
                  <div className={`${props.validRangeColor} rounded-full w-2 h-2 -mt-2"`} />
                  <div className={`${props.validRangeColor} w-0.5 h-full m-auto"`} />
                  <div className={`${props.validRangeColor} rounded-full w-2 h-2`} />
                </div>
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <div
                  key={id}
                  className={"absolute h-full " + props.className}
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`
                  }}
                  {...getTrackProps()}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
}
