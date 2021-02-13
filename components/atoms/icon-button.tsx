import React from "react"

type SquareButtonProps = {
  className?: string;
  body: React.ReactNode;
}

export default function SquareButton(props: SquareButtonProps) {
  return <button className={`${props.className} w-14 h-14`}>{props.body}</button>
}