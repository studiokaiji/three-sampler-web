import React from "react";

export type DottedLevelMeterProps = {
  className: string;
  max: number;
  min: number;
  level: number;
  dotsCount: number;
}

export default function DottedLevelMeter(props: Partial<DottedLevelMeterProps>) {
  const max = props.max || 1;
  const min = props.min || 0;
  const dotsCount = props.dotsCount || 7;
  const level = props.level || 0;

  const validDotsCount = Math.floor(level / (max - min) * dotsCount);

  const dots: React.ReactNode[] = []
  for (let n=1; n<=dotsCount; n++) {
    dots.push(
      <div className={`${validDotsCount >= n ? "bg-green-500" : "bg-white"} w-3 h-3 rounded-full`} />
    );
  }

  return (
    <div className={`flex justify-between ${props.className}`}>
      {dots}
    </div>
  );
}
