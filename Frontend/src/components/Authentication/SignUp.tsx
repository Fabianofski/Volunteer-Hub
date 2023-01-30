import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { InputValidation, Validation } from "./InputValidation";

async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  telephone: string,
  dateOfBirth: Date | undefined
) {
  await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
    const user = userCredential.user;
    console.log(user);
    const data = {
      uid: user.uid,
      email: email,
      firstname: firstname,
      lastname: lastname,
      telephone: telephone,
      dateOfBirth: dateOfBirth
    };

    await fetch("api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  });
}

function SignUp() {
  const navigate = useNavigate();
  if (auth.currentUser !== null) navigate("/");
  let inputValidation: InputValidation = new InputValidation();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const unsetForm = document.querySelector(".unset");
    const invalidForm = document.querySelector(".invalid");
    setAllInputsValid(invalidForm === null && unsetForm === null);
  }, [email, password, firstname, lastname, telephone, dateOfBirth]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(email, password, firstname, lastname, telephone, dateOfBirth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorCode + " " + errorMessage);
    });
  };

  const confirmPasswordIsValid = (input: string): Validation => {
    return { valid: password === input, info: [] };
  };

  return (
    <div className={"signUpPage"}>
      <form className={"signUpForm"}>
        <InputField
          value={firstname}
          setValue={setFirstname}
          type={""}
          placeholder={"First name"}
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <InputField
          value={lastname}
          setValue={setLastname}
          type={""}
          placeholder={"Last name"}
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <InputField
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder={"Email address"}
          isInputValid={inputValidation.emailIsValid}
        />
        <div></div>
        <InputField
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Password"}
          isInputValid={inputValidation.passwordIsValid}
        />
        <InputField
          value={confirmPassword}
          setValue={setConfirmPassword}
          type={"password"}
          placeholder={"Confirm password"}
          isInputValid={confirmPasswordIsValid}
        />
        <InputField
          value={telephone}
          setValue={setTelephone}
          type={"tel"}
          placeholder={"Telephone"}
          isInputValid={inputValidation.telephoneIsValid}
        />
        <InputField
          value={dateOfBirth}
          setValue={setDateOfBirth}
          type={"date"}
          placeholder={"Date of birth"}
          isInputValid={inputValidation.dateOfBirthIsValid}
        />
        <button className="col-span-2" type="submit" onClick={onSubmit} disabled={!allInputsValid}>
          Sign up
        </button>
      </form>
      <a href={"/login"}>Already have an account?</a>
    </div>
  );
}

export default SignUp;
