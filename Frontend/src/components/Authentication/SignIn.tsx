import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import InputField from "./InputField";

function SignIn(){
  const navigate = useNavigate();
  if (auth.currentUser !== null) navigate("/");

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    
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
  }
  return(
    <div>
      <form>
        <InputField value={email} setValue={setEmail} type={"email"} placeholder={"Email address"}/>
        <InputField value={password} setValue={setPassword} type={"password"} placeholder={"Password"}/>
        <button
          type="submit"
          onClick={onSubmit}
        >
          Sign in
        </button>
      </form>
      <a href={"/signup"}>Create a new account?</a>
    </div>
  );
}

export default SignIn;