import React, { useEffect, useRef } from "react";
import PeakAnalyzer from "../../tools/peak-analyzer";

export type WaveformProps = {
  url: string;
  width: number;
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
    console.log("A");
    analyzer.analyze(props.url, 9000).then((peaksArr) => {
      drawWaveForm(peaksArr)
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const drawWaveForm = (peaksArr: number[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) throw Error("canvas is null.");

    const barWidth = canvas.width / peaksArr[0].length;
    const halfCanvasHeight = canvas.height / 2;

    const ctx = getContext();
    if (!ctx) throw Error("canvasContext is null.");
    
    ctx.fillStyle = "#000000";
    
    let sample: number;
    let barHeight: number;
    for (let i=0, len = peaksArr[0].length; i<len; i++) {
      peaksArr.forEach((peaks, index) => {
        sample = peaks[index];
        barHeight = sample * halfCanvasHeight;
        ctx.fillRect(i * barWidth, halfCanvasHeight - barHeight, barWidth, barHeight);
      });
    }

    ctx.save();
  }

  return (
    <div {...props}>
      <canvas ref={canvasRef} width={props.width} />
    </div>
  );
}
