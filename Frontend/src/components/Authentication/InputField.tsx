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
};

function InputField({ title, value, setValue, type, placeholder, isInputValid }: Props) {
  const [info, setInfo] = useState<string[]>([]);
  const [className, setClassName] = useState("unset");

  const valueChanged = (input: string) => {
    const validation: Validation = isInputValid(input);
    setValue(input);
    setInfo(validation.info);
    if (input.length >= 2) setClassName(validation.valid ? "valid" : "invalid");
    else if (className !== "unset") setClassName("invalid");
  };
  useEffect(() => valueChanged(""), []);

  return (
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
  );
}

export default InputField;
