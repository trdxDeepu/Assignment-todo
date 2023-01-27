import React, { useState } from "react";
import { db, auth } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "../App.css";
const ToDo = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    console.log(user.displayName);
    if (title !== "") {
      await setDoc(doc(db, "users", user.uid), {
        title,
        completed: false,
      });
      toast.success("Task Added Successfully");

      setTitle("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            color="success"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Button
            className="btn_container"
            variant="outlined"
            onClick={handleSubmit}
          >
            Add{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ToDo;
