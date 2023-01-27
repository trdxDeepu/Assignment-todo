import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../App.css";
const OAuth = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate("/home");
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });
      toast.success("Signed in successfully");
    } catch (err) {
      toast.error("error");
    }
  };

  return (
    <div className="card">
      <h1>Sign in </h1>
      <Button variant="outlined" color="error" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default OAuth;
