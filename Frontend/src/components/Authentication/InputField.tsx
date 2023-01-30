import React, { ChangeEvent, useState } from "react";
import "./InputField.css";
import { Validation } from "./InputValidation";

type Props = {
  value: any;
  setValue: React.Dispatch<any>;
  type: string;
  placeholder: string;
  isInputValid: Function;
  title?: string;
};

function InputField({ value, setValue, type, placeholder, isInputValid, title }: Props) {
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
      <label className="title">{placeholder}</label>
      <input
        className={!valid ? "invalid" : "valid"}
        type={type}
        value={value}
        onChange={valueChanged}
        required
        title={title || ""}
        placeholder={placeholder}
      />
      {info.map((info) => {
        return <p>{info}</p>;
      })}
    </div>
  );
}

export default InputField;
