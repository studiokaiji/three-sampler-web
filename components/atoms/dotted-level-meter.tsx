import React from "react";

export type DottedLevelMeterProps = {
  className: string;
  max: number;
  min: number;
  level: number;
  width: number;
  dotsCount: number;
}

export default function DottedLevelMeter(props: Partial<DottedLevelMeterProps>) {
  props.max ??= 1;
  props.min ??= 0;
  props.width ??= 120;
  props.dotsCount ??= 6;
  props.level ??= 0;

  const validDotsCount = Math.floor(props.level / (props.max - props.min) * props.dotsCount);

  const dots: React.ReactNode[] = []
  for (let n=1; n<props.dotsCount; n++) {
    dots.push(
      <div className={`w-4 ${validDotsCount >= n ? "bg-green-500" : "bg-white"} w-3`} />
    );
  }

  return (
    <div className={`flex justify-between ${props.className}`}>
      {dots}
    </div>
  );
}
