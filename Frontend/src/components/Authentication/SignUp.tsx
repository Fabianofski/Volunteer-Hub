import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { InputValidation } from "./InputValidation";

async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  telephone: string,
  dateOfBirth: Date | undefined
) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

function SignUp() {
  const navigate = useNavigate();
  if (auth.currentUser !== null) navigate("/");
  let inputValidation: InputValidation = new InputValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const invalidForm = document.querySelector(".invalid");
    setAllInputsValid(invalidForm === null);
  }, [email, password, firstname, lastname, telephone, dateOfBirth]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(email, password, firstname, lastname, telephone, dateOfBirth);
    // .then(() => navigate("/"))
    // .catch((e) => alert(e));
  };
  return (
    <div>
      <form>
        <InputField
          value={email}
          setValue={setEmail}
          type={"email"}
          placeholder={"Email address"}
          isInputValid={inputValidation.emailIsValid}
        />
        <InputField
          value={password}
          setValue={setPassword}
          type={"password"}
          placeholder={"Password"}
          isInputValid={inputValidation.passwordIsValid}
        />
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
        <button type="submit" onClick={onSubmit} disabled={!allInputsValid}>
          Sign up
        </button>
      </form>
      <a href={"/login"}>Already have an account?</a>
    </div>
  );
}

export default SignUp;
