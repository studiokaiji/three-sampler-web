import React from "react";
import { useDropzone } from "react-dropzone";

export type PadProps = {
  className?: string;
  fileDraggable: boolean;
  children: React.ReactNode;
  onDropFile: (file: any) => void;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PadButton = (props: PadProps) => {
  return (
    <button
      className={`w-full h-full focus:outline-none ${props.className}`}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      {props.children}
    </button>
  );
}

export default function Pad(props: PadProps) {
  if (!props.fileDraggable) {
    return (
      <div className="w-24 h-24">
        <PadButton {...props} />
      </div>
    );
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: () => props.onDropFile,
    noClick: true,
  });

  return (
    <div {...getRootProps({ className: `w-24 h-24 bg-white ${props.className}` })}>
      <input {...getInputProps()} className="opacity-0" />
      {
        isDragActive ? 
          <p className="w-full h-full flex justify-center items-center">Add File</p> :
          <PadButton {...props} />
      }
    </div>
  );
}
