import React from "react";
import MicAndMonitorSwitcher from "../../components/molecules/mic-and-monitor-switcher";
import SectionTab from "../../components/molecules/section-tab";
import Router from "next/router";
import Bank from "../../components/molecules/bank";
import PadGrid from "../../components/molecules/pad-grid";

export default function Sample() {
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
            onSelectPad={(i) => console.log(i)}
          />
        </div>
      </div>
    </body>
  )
}