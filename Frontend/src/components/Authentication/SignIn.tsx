import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { InputValidation } from "./InputValidation";
import "./SignIn.css";
import { errorCodes } from "./ErrorCodes";

function SignIn() {
  const navigate = useNavigate();
  if (auth.currentUser !== null) navigate("/");

  let inputValidation: InputValidation = new InputValidation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("-");

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
        setError(errorCodes[errorCode] || errorCode);
      });
  };
  return (
    <div className="signInPage">
      <h1>Welcome Back!</h1>
      <form>
        <InputField
          title="Email"
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder="Enter your email"
          isInputValid={inputValidation.emailIsValid}
        />
        <InputField
          title="Password"
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Enter your password"}
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <button
          type="submit"
          onClick={onSubmit}
          disabled={!allInputsValid}
          title="Please fill in all the required fields">
          Sign in
        </button>
      </form>
      <p style={{ color: "red" }}>{error}</p>
      <a href={"/signup"}>Create a new account?</a>
    </div>
  );
}

export default SignIn;
