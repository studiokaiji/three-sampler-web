import React from "react"

export type SquareButtonProps = {
  className?: string;
  children: React.ReactNode;
}

export default function SquareButton(props: SquareButtonProps) {
  return <button className={`${props.className} w-14 h-14`}>{props.children}</button>
}