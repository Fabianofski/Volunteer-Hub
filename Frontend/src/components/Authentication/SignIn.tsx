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
    <div>
      <form>
        <InputField
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder={"Email address"}
          title="Please enter your email adress"
          isInputValid={inputValidation.emailIsValid}
        />
        <InputField
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Password"}
          title="Please enter your password. It should contain at least 3 characters."
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <button className="SignIn" type="submit" onClick={onSubmit} disabled={!allInputsValid} >
          Sign in
        </button>
      </form>
      <a href={"/signup"}>Create a new account?</a>
    </div>
  );
}

export default SignIn;
