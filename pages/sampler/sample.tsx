import React, { useEffect, useState, useReducer } from "react";
import MicAndMonitorSwitcher from "../../components/molecules/mic-and-monitor-switcher";
import SectionTab from "../../components/molecules/section-tab";
import Router from "next/router";
import Bank from "../../components/molecules/bank";
import PadGrid from "../../components/molecules/pad-grid";
import WaveformEditor from "../../components/waveform-editor";
import { Panner, Player } from "tone"
import { Positive } from "tone/build/esm/core/type/Units";

export class Sample extends Player {
  constructor(
    originalAudioUrl?: string, 
    opts?: Partial<{
      playbackRate: Positive;
      db: number;
      oneShot: boolean;
      startSec: number;
      endSec: number;
      panLevel: number;
    }>
  ) {
    super(originalAudioUrl)

    this.toDestination();

    opts ??= {};
    this.originalAudioUrl = originalAudioUrl || "";
    this.playbackRate = opts.playbackRate || 1;
    this.volume.value = opts.db || -6;
    this.oneShot = opts.oneShot || true;
    
    if (opts.startSec) this.changeValidRange(opts.startSec, opts.endSec)
    this._startSec = opts.startSec || 0;
    this._endSec = opts.endSec || this.buffer.duration;

    const panLevel = opts.panLevel || 0;
    this._panner = new Panner(panLevel).toDestination();
    this._panLevel = panLevel;
    this.connect(this._panner).start();
  }

  oneShot: boolean;
  readonly originalAudioUrl: string;
  private _panLevel: number;
  private _startSec: number;
  private _endSec: number;
  private readonly _panner: Panner;

  async changeValidRange(startSec: number, endSec?: number): Promise<void> {
    const sliced = this.buffer.slice(startSec, endSec);
    const url = URL.createObjectURL(sliced);
    
    await this.load(url);
    
    this._startSec = startSec;
    if (endSec) this._endSec = endSec;
  }

  set panLevel(panLevel: number) {
    this._panner.pan.setValueAtTime(panLevel, 0);
    this._panLevel = panLevel;
  }

  get panLevel(): number {
    return this._panLevel;
  }

  get startSec(): number {
    return this._startSec;
  }

  get endSec(): number {
    return this._endSec;
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
      value: new Sample(url)
    });
  }

  const pressedPadHandler = (index: number) => {
    if (samples[index]) samples[index].start(0);
    else startRecord(index);
    setPadIndex(index);
  }

  const pressedEndPadHandler = (index: number) => {
    const sample = samples[index];
    if (!sample) stopRecord(index);
    else if (!sample.oneShot) sample.stop(0);
  }

  const droppedFileHandler = (file: File, index: number) => {
    const url = URL.createObjectURL(file);
    loadSample(url, index);
  }

  const changedSamplePropertyOnWaveFormEditor = (sample: Sample) => {
    samples[padIndex] = sample;
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
            sample={samples[padIndex]}
            url={samples[padIndex].originalAudioUrl} peakLength={1000}
            onChangeValue={changedSamplePropertyOnWaveFormEditor}
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
            sampleUrls={samples.map((sample) => sample.originalAudioUrl)}
            onPressPad={pressedPadHandler}
            onPressEndPad={pressedEndPadHandler}
            onDropFile={droppedFileHandler}
          />
        </div>
      </div>
    </body>
  )
}