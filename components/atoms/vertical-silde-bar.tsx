import React from "react";

type VerticalSlideBarProps = {
  barBgColor: string,
} & JSX.IntrinsicElements["div"];

export default function VerticalSlideBar(props: VerticalSlideBarProps) {
  return (
    <div {...props}>
      <div className={props.barBgColor + " rounded-full w-2 h-2 -mt-2"} />
      <div className={props.barBgColor + " w-0.5 h-full m-auto"} />
      <div className={props.barBgColor + " rounded-full w-2 h-2"} />
    </div>
  );
}
