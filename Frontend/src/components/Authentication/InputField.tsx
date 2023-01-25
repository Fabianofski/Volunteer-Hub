import React, { ChangeEvent, useState } from "react";
import "./InputField.css";

type Props = {
  value: any;
  setValue: React.Dispatch<any>;
  type: string;
  placeholder: string;
  isInputValid: Function;
};

function InputField({ value, setValue, type, placeholder, isInputValid }: Props) {
  const [valid, setValid] = useState(false);
  const valueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setValid(isInputValid(e.target.value));
  };

  return (
    <div>
      <label>{placeholder}</label>
      <input
        className={!valid ? "invalid" : "valid"}
        type={type}
        value={value}
        onChange={valueChanged}
        required
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
