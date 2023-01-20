import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";
import InputField from "./InputField";

type Props = {
  currentUser: User | undefined,
}

function SignUp({currentUser}:Props){
  const navigate = useNavigate();
  useEffect(() =>
  {
    if (currentUser !== undefined)
      navigate("/")
  }, [currentUser, navigate]);
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        fetch(`api/signUp?uid=${user.uid}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}&dateOfBirth=${dateOfBirth}`, {method: "POST"})
          .then(response  => response.json())
          .then(data => console.log(data));
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
        <InputField value={firstname} setValue={setFirstname} type={""} placeholder={"First name"}/>
        <InputField value={lastname} setValue={setLastname} type={""} placeholder={"Last name"}/>
        <InputField value={telephone} setValue={setTelephone} type={"tel"} placeholder={"Telephone"}/>
        <InputField value={dateOfBirth} setValue={setDateOfBirth} type={"date"} placeholder={"Date of birth"}/>
        <button
          type="submit"
          onClick={onSubmit}
        >
          Sign up
        </button>
      </form>
      <a href={"/login"}>Already have an account?</a>
    </div>
  );
}

export default SignUp;