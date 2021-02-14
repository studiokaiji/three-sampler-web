import React from "react"

export type SquareButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function SquareButton(props: SquareButtonProps) {
  return (
    <button 
      className={`${props.className} w-14 h-14 rounded-md shadow-md focus:outline-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}