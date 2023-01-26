import React from "react";

type Props = {
  value : any,
  setValue : React.Dispatch<any>,
  type : string,
  placeholder : string,
}

function InputField ({value, setValue, type, placeholder} : Props) {
  return(
    <div>
      <label>
        {placeholder}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;