import React, { useEffect, useState, useReducer } from "react";
import MicAndMonitorSwitcher from "../../components/molecules/mic-and-monitor-switcher";
import SectionTab from "../../components/molecules/section-tab";
import Router from "next/router";
import Bank from "../../components/molecules/bank";
import PadGrid from "../../components/molecules/pad-grid";
import WaveForm from "../../components/atoms/waveform";

class Sample {
  audio: HTMLAudioElement;
  pitch: number;
  volume: number;
  pan: number;
  waveform: typeof WaveForm | null;

  constructor(opts: {
    audio?: HTMLAudioElement;
    pitch?: number;
    volume?: number;
    pan?: number;
    waveform?: typeof WaveForm;
  }) {
    this.audio = opts.audio || new Audio();
    this.pitch = opts.pitch || 0;
    this.volume = opts.volume || 0;
    this.pan = opts.pan || 0;
    this.waveform = opts.waveform || null;
  }
}


type SampleAction =
{
  type: "assign",
  index: number,
  value: Sample,
} | {
  type: "remove",
  index: number,
}

function samplesReducer(state: Sample[], action: SampleAction) {
  if (action.type === "assign") {
    state[action.index] = action.value;
    console.log(state);
  } else {
    state[action.index] = null;
  }

  return state;
}

async function createStream() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  return stream;
} 

let recorder: MediaRecorder;

export default function SamplePage() {
  const [samples, dispatchSamples] = useReducer(samplesReducer, []);
  const [sampleUrls, setSampleUrls] = useState<string[]>([]);
  const [padIndex, setPadIndex] = useState<number>(-1);

  useEffect(() => {
    createStream().then((stream) => {
      recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
        audioBitsPerSecond: 24 * 1000
      });
    }) 
  }, []);

  const startRecord = async (padIndex: number) => {
    if (padIndex > 15 || padIndex < 0) throw Error("Invalid pad index.");

    setTimeout(() => {
      stopRecord(padIndex);
    }, 5 * 60 * 1000);

    recorder.start();
  }

  const stopRecord = async (padIndex: number) => {
    if (padIndex > 15 || padIndex < 0) throw Error("Invalid pad index.");
    if (!recorder || recorder.state === "inactive") return;

    recorder.addEventListener("dataavailable", (e) => {
      const url = URL.createObjectURL(e.data);
      loadSample(url, padIndex);
    });

    recorder.stop();
  }

  const loadSample = (url: string, padIndex: number) => {
    dispatchSamples({
      type: "assign",
      index: padIndex,
      value: new Audio(url)
    });

    const urls = sampleUrls.concat();
    urls[padIndex] = url;

    setSampleUrls(urls);
  }

  const playSample = (padIndex: number) => {
    samples[padIndex].currentTime = 0;
    samples[padIndex].play();
  }

  const stopSample = (padIndex: number) => {
    if (samples[padIndex]) {
      samples[padIndex].pause();
      samples[padIndex].currentTime = 0; 
    }
  }

  const stopAllSample = () => {
    for (let i=0; i<samples.length; i++) {
      stopSample(i);
    }
  }

  const pressedPadHandler = (index: number) => {
    if (samples[index]) playSample(index);
    else startRecord(index);
    setPadIndex(index);
  }

  const pressedEndPadHandler = (index: number) => {
    if (!samples[index]) stopRecord(index);
  }

  const droppedFileHandler = (file: File, index: number) => {
    const url = URL.createObjectURL(file);
    loadSample(url, index);
  }

  return (
    <body className="bg-secondary">
      <div id="sampler-sample" className="m-8 max-w-6xl grid gap-y-10">
        <div className="flex justify-between items-end ...">
          <MicAndMonitorSwitcher 
            className="w-24"
            onClickMicIcon={() => console.log("a")}
            onClickMonitorIcon={() => console.log("B")}
          />
          <SectionTab 
            selectedClassName="text-white bg-primary"
            unselectedClassName="text-text-primary bg-secondary-light"
            selected="sample"
            onSelectCell={(text) => Router.push("/sampler/" + text)}
          />
        </div>
        <div className="flex justify-between items-end ...">
          <Bank
            bankIndex={0}
            selectedClassName="text-white bg-primary"
            unselectedClassName="text-text-primary bg-secondary-light"
            onSelectBank={(index) => console.log(index)}
          />
          <PadGrid
            className="w-9/12"
            selectedPadClassName="bg-gray-200"
            padIndex={padIndex}
            sampleUrls={sampleUrls}
            onPressPad={pressedPadHandler}
            onPressEndPad={pressedEndPadHandler}
            onDropFile={droppedFileHandler}
          />
        </div>
      </div>
    </body>
  )
}