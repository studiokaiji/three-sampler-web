import React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";

export type FaderProps = {
  domain: [number, number]
  value: number;
  validRangeColor: string;
} & JSX.IntrinsicElements["div"];

export default function Fader(props: FaderProps) {
  return (
    <div {...props}>
      <Slider
        vertical
        className="w-full h-full relative"
        rootStyle={{
          touchAction: "none"
        }}
        domain={props.domain}
        values={[props.value]}
        mode={2}
        onChange={(v) => console.log(v)}
      >
        <Rail>
          {({ getRailProps }) => (
            <div className={`${props.className} h-full cursor-pointer -translate-x-1/2`} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="invisible-slider-handles">
              {handles.map((handle) => (
                <div
                  key={handle.id}
                  className="absolute w-full cursor-pointer z-20 -translate-x-1/2 -translate-y-1/2"
                  role="slider"
                  aria-valuemin={props.domain[0]}
                  aria-valuemax={props.domain[1]}
                  aria-valuenow={props.value}
                  style={{
                    top: `${handle.percent}%`,
                  }}
                  {...getHandleProps(handle.id)}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false}>
          {({ tracks, getTrackProps }) => (
            <div className="vertical-slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <div
                  key={id}
                  className={`absolute w-full h-full z-10 cursor-pointer -translate-x-1/2 ${props.validRangeColor}`}
                  style={{
                    top: `${source.percent}%`,
                    height: `${target.percent - source.percent}%`,
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
