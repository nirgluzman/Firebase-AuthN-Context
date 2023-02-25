import "./App.css";
import { useState } from "react";

import GoogleButton from "react-google-button";

import { useUserAuth } from "./context/UserAuthContext";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { user, logIn, signUp, logOut, googleSignIn } = useUserAuth();

  const signupHandler = async () => {
    try {
      const userCredential = await signUp(registerEmail, registerPassword);
      console.log("signup user:", userCredential.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginHandler = async () => {
    try {
      const userCredential = await logIn(loginEmail, loginPassword);
      console.log("login user:", userCredential.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  const googleSigninHandler = async () => {
    try {
      const userCredential = await googleSignIn();
      console.log("Google user:", userCredential.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <>
        <h3>Create User</h3>
        <input
          placeholder="Email..."
          value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password..."
          value={registerPassword}
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={signupHandler}>Signup</button>
      </>
      <>
        <h3>Login User</h3>
        <input
          placeholder="Email..."
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password..."
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={loginHandler}>Login</button>
      </>

      <>
        <GoogleButton type="dark" onClick={googleSigninHandler} />
      </>

      <h3>User Logged In: {user?.email}</h3>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}

export default App;
