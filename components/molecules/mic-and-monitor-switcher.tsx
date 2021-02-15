import React from "react";
import DottedLevelMeter, { DottedLevelMeterProps } from "../atoms/dotted-level-meter";

export type MicAndMonitorSwitcherProps = {
  onClickMicIcon: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickMonitorIcon: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & Partial<DottedLevelMeterProps>;

export default function MicAndMonitorSwitcher(props: MicAndMonitorSwitcherProps) {
  return (
    <div className={props.className}>
      <DottedLevelMeter {...props} />
      <div className="flex justify-between mt-3">
        <button className="bg-white w-10 h-10 focus:outline-none" onClick={props.onClickMicIcon}>
          <img id="mic-icon" />
        </button>
        <button className="bg-white w-10 h-10 focus:outline-none" onClick={props.onClickMonitorIcon}>
          <img id="headphone-icon" />
        </button>
      </div>
    </div>
  );
}
