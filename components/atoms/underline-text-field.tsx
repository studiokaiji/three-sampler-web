import React from "react";

export type UnderlineTextFieldProps = {
  type: "number" | "text";
  underlineColor: string;
} & JSX.IntrinsicElements["input"];

export default function UnderlineTextField(props: Partial<UnderlineTextFieldProps>) {
  return (
    <>
      <input {...props} className={`outline-none border-none relative ${props.className}`} />
      <div className={`border-t border-solid ${props.underlineColor || "bg-gray-400"}`} />
    </>
  );
}
