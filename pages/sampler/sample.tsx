import React, { useEffect, useState, useReducer } from "react";
import MicAndMonitorSwitcher from "../../components/molecules/mic-and-monitor-switcher";
import SectionTab from "../../components/molecules/section-tab";
import Router from "next/router";
import Bank from "../../components/molecules/bank";
import PadGrid from "../../components/molecules/pad-grid";
import WaveformEditor from "../../components/waveform-editor";

export class Sample {
  audio: HTMLAudioElement;
  pitch: number;
  volume: number;
  pan: number;
  oneShot: boolean;
  start: number;
  end: number;

  constructor(opts?: Partial<{
    audio: HTMLAudioElement;
    pitch: number;
    volume: number;
    pan: number;
    oneShot: boolean;
    start: number;
    end: number;
  }>) {
    opts ??= {};
    this.audio = opts.audio || new Audio();
    this.pitch = opts.pitch || 0;
    this.volume = opts.volume || 1;
    this.pan = opts.pan || 0;
    this.oneShot = opts.oneShot || true;
    this.start = opts.start || 0;
    this.end = opts.end || 0;
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
    state.forEach((sample) => {
      console.log(sample.audio);
    });
  } else {
    state[action.index] = new Sample();
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
    }, { once: true });

    recorder.stop();
  }

  const loadSample = (url: string, padIndex: number) => {
    console.log("LOAD SAMPLE", padIndex);
    dispatchSamples({
      type: "assign",
      index: padIndex,
      value: new Sample({ audio: new Audio(url) })
    });

    const urls = sampleUrls.concat();
    urls[padIndex] = url;

    setSampleUrls(urls);
  }

  const playSample = (padIndex: number) => {
    samples[padIndex].audio.currentTime = 0;
    samples[padIndex].audio.play();
  }

  const stopSample = (padIndex: number) => {
    samples[padIndex].audio.pause();
    samples[padIndex].audio.currentTime = 0; 
  }

  const stopAllSample = () => {
    for (let i=0; i<samples.length; i++) {
       if (samples[i]) stopSample(i);
    }
  }

  const pressedPadHandler = (index: number) => {
    console.log(samples[index]);
    if (samples[index]) playSample(index);
    else startRecord(index);
    setPadIndex(index);
  }

  const pressedEndPadHandler = (index: number) => {
    const sample = samples[index];
    if (!sample) stopRecord(index);
    else if (!sample.oneShot) stopSample(index);
  }

  const droppedFileHandler = (file: File, index: number) => {
    const url = URL.createObjectURL(file);
    loadSample(url, index);
  }

  const changedSamplePropertyOnWaveFormEditor = (sample: Sample) => {

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
        <div className="flex justify-end">
          <WaveformEditor
            className="w-9/12 h-52 bg-white"
            start={0}
            end={500}
            url="/test-audio.m4a" peakLength={1000}
            onChangeValue={(s, e) => console.log(s, e)}
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