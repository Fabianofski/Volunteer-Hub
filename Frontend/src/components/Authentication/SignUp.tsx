import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { InputValidation, Validation } from "./InputValidation";
import { errorCodes } from "./ErrorCodes";
import { User } from "../../model/User";

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
    const data: User = {
      _id: user.uid,
      email: email,
      firstname: firstname,
      lastname: lastname,
      telephone: telephone,
      dateOfBirth: dateOfBirth?.toString() || ""
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
  document.title = "Sign Up - Volunteer-Hub";

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
  const [error, setError] = useState("-");

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
      setError(errorCodes[errorCode] || errorCode);
    });
  };

  const confirmPasswordIsValid = (input: string): Validation => {
    return { valid: password === input, info: [] };
  };

  return (
    <div className={"signUpPage"}>
      <h1>Create a new Account!</h1>
      <form className={"signUpForm"}>
        <InputField
          value={firstname}
          setValue={setFirstname}
          type={""}
          title="First Name"
          placeholder={"Enter your first name"}
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <InputField
          value={lastname}
          setValue={setLastname}
          type={""}
          title="Last Name"
          placeholder={"Enter your last name"}
          isInputValid={inputValidation.inputIsNotEmpty}
        />
        <InputField
          value={email}
          setValue={setEmail}
          type={"email"}
          title="Email"
          placeholder={"Enter your email"}
          isInputValid={inputValidation.emailIsValid}
        />
        <div></div>
        <InputField
          value={password}
          setValue={setPassword}
          type={"password"}
          title="Password"
          placeholder={"Enter your password"}
          isInputValid={inputValidation.passwordIsValid}
          showInfo={true}
        />
        <InputField
          value={confirmPassword}
          setValue={setConfirmPassword}
          type={"password"}
          title="Confirm Password"
          placeholder={"Confirm your password"}
          isInputValid={confirmPasswordIsValid}
        />
        <InputField
          value={telephone}
          setValue={setTelephone}
          type={"tel"}
          title="Telephone"
          placeholder={"Enter your telephone number"}
          isInputValid={inputValidation.telephoneIsValid}
        />
        <InputField
          value={dateOfBirth}
          setValue={setDateOfBirth}
          type={"date"}
          title="Date Of Birth"
          placeholder={"Enter your Date of birth"}
          isInputValid={inputValidation.dateOfBirthIsValid}
        />
        <button className="col-span-2" type="submit" onClick={onSubmit} disabled={!allInputsValid}>
          Sign up
        </button>
      </form>
      <p style={{ color: "red" }}>{error}</p>
      <a href={"/login"}>Already have an account?</a>
    </div>
  );
}

export default SignUp;
