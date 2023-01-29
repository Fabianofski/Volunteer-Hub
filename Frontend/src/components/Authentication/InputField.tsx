import React, { ChangeEvent, useState } from "react";
import "./InputField.css";

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
  const valueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setValid(isInputValid(e.target.value));
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
    </div>
  );
}

export default InputField;
