import React from "react";
import { SliderItem, GetHandleProps } from "react-compound-slider";

type VerticalSlideBarProps = {
  barBgColor: string;
  domain: [number, number];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function VerticalSlideHandle({
  domain: [min, max] = [0, 100],
  handle: { id, value, percent },
  getHandleProps,
  barBgColor
}: VerticalSlideBarProps) {
  return (
    <div
      className="absolute h-full -ml-1"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`
      }}
      {...getHandleProps(id)}
    >
      <div className={barBgColor + " rounded-full w-2 h-2 -mt-2"} />
      <div className={barBgColor + " w-0.5 h-full m-auto"} />
      <div className={barBgColor + " rounded-full w-2 h-2"} />
    </div>
  );
}
