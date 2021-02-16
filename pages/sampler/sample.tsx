import React, { useEffect, useState, useReducer } from "react";
import MicAndMonitorSwitcher from "../../components/molecules/mic-and-monitor-switcher";
import SectionTab from "../../components/molecules/section-tab";
import Router from "next/router";
import Bank from "../../components/molecules/bank";
import PadGrid from "../../components/molecules/pad-grid";

type Sample = HTMLAudioElement;
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
    state[action.index] = new Audio();
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

export default function Sample() {
  const [samples, dispatchSamples] = useReducer(samplesReducer, []);
  const recordedPadIndexes = useState<number[]>([]);

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

    console.log("STARTTED")
  }

  const stopRecord = async (padIndex: number) => {
    if (padIndex > 15 || padIndex < 0) throw Error("Invalid pad index.");
    if (!recorder || recorder.state === "inactive") return;

    recorder.addEventListener("dataavailable", (e) => {
      const url = URL.createObjectURL(e.data);
      dispatchSamples({
        type: "assign",
        index: padIndex,
        value: new Audio(url)
      })

      console.log("dataAvailable", url);
    });

    recorder.stop();
  }

  const playSample = (padIndex: number) => {
    samples[padIndex].currentTime = 0;
    samples[padIndex].play();
    console.log("STARTED PLAY")
  }

  const stopSample = (padIndex: number) => {
    samples[padIndex].pause();
    console.log("STOPPED PLAY")
    samples[padIndex].currentTime = 0;
  }

  const pressedPadHandler = (index: number) => {
    if (samples[index]) playSample(index);
    else startRecord(index);
  }

  const pressedEndPadHandler = (index: number) => {
    if (!samples[index]) stopRecord(index);
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
            selectedPadClassName="bg-primary"
            padIndex={0}
            recordedPadIndexes={recordedPadIndexes}
            onPressPad={(i) => pressedPadHandler(i)}
            onPressEndPad={(i) => pressedEndPadHandler(i)}
          />
        </div>
      </div>
    </body>
  )
}