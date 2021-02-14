import React from "react";
import IconButton from "../atoms/icon-button";
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
        <IconButton className="bg-white" onClick={props.onClickMicIcon}>
          <img id="mic-icon" />
        </IconButton>
        <IconButton className="bg-white" onClick={props.onClickMonitorIcon}>
          <img id="headphone-icon" />
        </IconButton>
      </div>
    </div>
  );
}
