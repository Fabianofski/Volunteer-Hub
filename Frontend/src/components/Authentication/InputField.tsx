import React, { ChangeEvent, useState } from "react";
import "./InputField.css";
import { Validation } from "./InputValidation";

type Props = {
  title?: String;
  value: any;
  setValue: React.Dispatch<any>;
  type: string;
  placeholder: string;
  isInputValid: Function;
  tooltip?: string;
};

function InputField({ title, value, setValue, type, placeholder, isInputValid, tooltip }: Props) {
  const [valid, setValid] = useState(false);
  const [info, setInfo] = useState<string[]>([]);

  const valueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const validation: Validation = isInputValid(e.target.value);
    setValid(validation.valid);
    setInfo(validation.info);
  };

  return (
    <div>
      <label className="title">{title || placeholder}</label>
      <input
        className={!valid ? "invalid" : "valid"}
        type={type}
        value={value}
        onChange={valueChanged}
        required
        title={tooltip || ""}
        placeholder={placeholder}
      />
      {info.map((info) => {
        return <p>{info}</p>;
      })}
    </div>
  );
}

export default InputField;
