import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";

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
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
        <div>
          <label htmlFor="email-address">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
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