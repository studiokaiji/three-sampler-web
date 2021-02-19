import React, { useEffect, useRef } from "react";
import PeakAnalyzer from "../../tools/peak-analyzer";

export type WaveformProps = {
  url: string;
  peakLength: number;
} & JSX.IntrinsicElements["div"];

const EX_RATE = 2;

export default function Waveform(props: WaveformProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const analyzer = new PeakAnalyzer();
    console.log("A");
    analyzer.analyze(props.url, props.peakLength).then((peaksArr) => {
      drawWaveForm(peaksArr)
    }).catch((err) => {
      console.error(err);
    });
  }, []); 

  const drawWaveForm = (peaksArr: number[][]) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) throw Error("wrapper is null");

    const canvas = canvasRef.current;
    if (!canvas) throw Error("canvas is null.");

    const clientWidth = wrapper.clientWidth;
    const clientHeight = wrapper.clientHeight;

    canvas.width = clientWidth * EX_RATE;
    canvas.height = clientHeight * EX_RATE;

    canvas.style.width = clientWidth + "px";
    canvas.style.height = clientHeight + "px";

    const ctx = canvas.getContext("2d");
    if (!ctx) throw Error ("context is null.");
    
    ctx.scale(2, 2);
    ctx.fillStyle = "#a9a9a9";

    const barWidth = canvas.width / peaksArr[0].length / EX_RATE;
    const halfCanvasHeight = canvas.height / 2 / EX_RATE;
    
    let sample: number;
    let barHeight: number;
    for (let i=0, len = peaksArr[0].length; i<len; i++) {
      sample = peaksArr[0][i];
      barHeight = sample * halfCanvasHeight;
      ctx.fillRect(i * barWidth, halfCanvasHeight - barHeight, barWidth, barHeight);

      if (peaksArr.length > 1) {
        sample = peaksArr[1][i];
        barHeight = sample * halfCanvasHeight;
      }
      ctx.fillRect(i * barWidth, halfCanvasHeight, barWidth, barHeight);
    }

    ctx.save();
  }

  return (
    <div {...props}>
      <div ref={wrapperRef} className="w-full h-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
