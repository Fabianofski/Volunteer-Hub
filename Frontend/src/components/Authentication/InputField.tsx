import React, { ChangeEvent, useEffect, useState } from "react";
import "./InputField.css";
import { Validation } from "./InputValidation";

type Props = {
  title?: String;
  value: any;
  setValue: React.Dispatch<any>;
  type: string;
  placeholder: string;
  isInputValid: Function;
  showInfo?: boolean;
  className?: string;
  accept?: string;
};

function InputField({
  title,
  value,
  setValue,
  type,
  placeholder,
  isInputValid,
  showInfo,
  className,
  accept
}: Props) {
  const [info, setInfo] = useState<string[]>([]);
  const [validState, setValidState] = useState("unset");

  const valueChanged = (input: any) => {
    if (input === undefined) return;
    const validation: Validation = isInputValid(input);
    setValue(input);
    setInfo(validation.info);
    if (input.length >= 2 || Number(input)) setValidState(validation.valid ? "valid" : "invalid");
    else if (validState !== "unset") setValidState("invalid");
  };
  useEffect(() => valueChanged(value), []);

  return (
    <div className={className}>
      <label className="title">{title || placeholder}</label>
      <div className={`inputField ${validState}`}>
        <input
          type={type}
          defaultValue={value}
          onChange={(e) => valueChanged(e.target.value)}
          required
          placeholder={placeholder}
          title={placeholder}
          accept={accept || ""}
        />
        {showInfo ? (
          <>
            <div className="infoButton">?</div>
            <div className="info">
              {info.map((info, idx) => {
                return <p key={idx}>{info}</p>;
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default InputField;

/* 
    <div>
      <label className="title">{title || placeholder}</label>
      <input
        className={"inputField " + className}
        type={type}
        value={value}
        onChange={(e) => valueChanged(e.target.value)}
        required
        placeholder={placeholder}
      />
      <div className={"info"}>
        {info.map((info, idx) => {
          return <p key={idx}>{info}</p>;
        })}
      </div>
    </div>
*/
