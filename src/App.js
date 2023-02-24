import "./App.css";
import { useState } from "react";

import { auth } from "./firebase-config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("signup user:", user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("login user:", user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <div>
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
        <button onClick={signup}>Signup</button>
      </div>
      <div>
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
        <button onClick={login}>Login</button>
      </div>

      <h3>User Logged In: {user?.email}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
