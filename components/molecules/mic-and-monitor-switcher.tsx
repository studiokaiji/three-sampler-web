import React from "react";
import IconButton from "../atoms/icon-button";
import DottedLevelMeter, { DottedLevelMeterProps } from "../atoms/dotted-level-meter";

export default function MicAndMonitorSwitcher(props: DottedLevelMeterProps) {

  return (
    <div className={props.className}>
      <div className="flex justify-between">
        <IconButton>
          <img id="mic-icon" />
        </IconButton>
        <IconButton>
          <img id="headphone-icon" />
        </IconButton>
      </div>
      <DottedLevelMeter {...props} className="w-32" />
    </div>
  );
}
