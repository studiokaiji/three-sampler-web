import React from "react";
import Cell from "../atoms/tab-cell";

type CellText = "sample" | "sequence" | "effect";

export type SectionTabProps = {
  selectedClassName: string;
  unselectedClassName: string;
  selected: CellText;
  onSelectCell: (text: CellText) => void;
}

export default function SectionTab(props: SectionTabProps) {
  return (
    <div className="shadow-md">
      <Cell
        className={props.selected === "sample" ? props.selectedClassName : props.unselectedClassName}
        onClick={() => props.onSelectCell("sample")}
      >
        Sample
      </Cell>
      <Cell
        className={props.selected === "sequence" ? props.selectedClassName : props.unselectedClassName}
        onClick={() => props.onSelectCell("sequence")}
      >
        Sequence
      </Cell>
      <Cell
        className={props.selected === "effect" ? props.selectedClassName :props. unselectedClassName}
        onClick={() => props.onSelectCell("effect")}
      >
        Effect
      </Cell>
    </div>
  )
}
