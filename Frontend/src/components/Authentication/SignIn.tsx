import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { InputValidation } from "./InputValidation";
import "./SignIn.css"

function SignIn() {
  const navigate = useNavigate();
  if (auth.currentUser !== null) navigate("/");

  let inputValidation: InputValidation = new InputValidation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const invalidForm = document.querySelector(".invalid");
    setAllInputsValid(invalidForm === null);
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log(auth.currentUser);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="signInPage">
      <form>
        <InputField
          title="Email"
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder="Enter your email"
          tooltip="Enter your email (email@example.com)"
          isInputValid={inputValidation.emailIsValid}
        />
        <InputField
          title="Password"
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Enter your password"}
          tooltip={"Enter your password. \nIt should contain at least 3 characters."} // TODO!! Was muss es beinhalten`?
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <button type="submit" onClick={onSubmit} disabled={!allInputsValid} title="Please fill in all the required fields">
          Sign in
        </button>
      </form>
      <a href={"/signup"}>Create a new account?</a>
    </div>
  );
}

export default SignIn;
