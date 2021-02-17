import React, { useEffect, useRef } from "react";
import PeakAnalyzer from "../../tools/peak-analyzer";

export type WaveformProps = {
  url: string;
  width: number;
  height: number;
} & JSX.IntrinsicElements["div"];

export default function Waveform(props: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) throw Error("canvas is null.");

    return canvas.getContext("2d");
  }
  
  useEffect(() => {
    const analyzer = new PeakAnalyzer();
    analyzer.analyze(props.url, 1000).then((peaksArr) => {
      drawWaveForm(peaksArr[0], peaksArr[1]);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const drawWaveForm = (ch1: number[], ch2: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) throw Error("canvas is null.");

    const barWidth = canvas.width / ch1.length;
    const halfCanvasHeight = canvas.height / 2;

    const ctx = getContext();
    if (!ctx) throw Error("canvasContext is null.");
    
    ctx.fillStyle = "#D3D3D3";
    
    let sample: number;
    let barHeight: number;
    for (let i=0, len = ch1.length; i<len; i++) {
      sample = ch1[i];
      barHeight = sample * halfCanvasHeight;
      ctx.fillRect(i * barWidth, halfCanvasHeight - barHeight, barWidth, barHeight);

      sample = ch2[i];
      barHeight = sample * halfCanvasHeight;
      ctx.fillRect(i * barWidth, halfCanvasHeight, barWidth, barHeight);
    }
  }

  return (
    <div {...props}>
      <canvas ref={canvasRef} />
    </div>
  );
}
