import React, {useEffect, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";

type Props = {
  currentUser: User | undefined,
  setCurrentUser: React.Dispatch<User>
}

function SignIn({currentUser, setCurrentUser}: Props){
  const navigate = useNavigate();
  useEffect(() =>
  {
    if (currentUser !== undefined)
      navigate("/")
  }, [currentUser, navigate]);
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const onSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(new User(user.uid, user.email, 13566, "Berlin", "street", 56));
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
          Sign in
        </button>
      </form>
      <a href={"/signup"}>Create a new account?</a>
    </div>
  );
}

export default SignIn;