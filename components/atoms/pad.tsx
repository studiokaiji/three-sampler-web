import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";

const ACCEPT_AUDIO_TYPES = ["audio/aac", "audio/mpeg", "audio/ogg", "audio/x-m4a", "audio/x-wav", "audio/x-aiff", "audio/x-flac"];

export type PadProps = {
  children: React.ReactNode;
  onDropFile: (acceptedFile: File) => void;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & JSX.IntrinsicElements["div"];

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
  const onDropped = (files: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      return console.error("file is rejected.");
    }
    props.onDropFile(files[0]);
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: onDropped,
    accept: ACCEPT_AUDIO_TYPES,
    noClick: true,
    maxFiles: 1,
  });

  return (
    <div {...getRootProps({ className: `bg-white shadow-md ${props.className}` })}>
      <input {...getInputProps()} className="opacity-0" />
      {
        isDragActive ? 
          <p className="w-full h-full flex justify-center items-center">Add File</p> :
          <PadButton {...props} />
      }
    </div>
  );
}
