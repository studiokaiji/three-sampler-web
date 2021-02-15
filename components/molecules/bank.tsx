import React from "react";
import IconButton from "../atoms/icon-button";

export type BankProps = {
  selectedClassName: string;
  unselectedClassName: string;
  bankIndex: number;
  onSelectBank: (bankIndex: number) => void;
}

export default function Bank(props: BankProps) {
  const bankTexts = Array.from({length: 8}, (_, i) => String.fromCodePoint(i + 65));
  const bankButtons = () => {
    const buttons: React.ReactNode[] = [];
    bankTexts.forEach((text, i) => {
      buttons.push(
        <IconButton 
          className={props.bankIndex === i ? props.selectedClassName : props.unselectedClassName + " font-medium"}
          onClick={() => props.onSelectBank(i)}
        >
          {text}
        </IconButton>
      );
    });
    return buttons;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-56">
      {bankButtons()}
    </div>
  );
}
