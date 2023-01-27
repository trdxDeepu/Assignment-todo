import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ToDo from "./ToDo";
import "../App.css";
import CrudTodo from "./CrudTodo";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const user = auth.currentUser;

  const navigate = useNavigate();

  const SignOut = () => {
    signOut(auth).then(() => {
      toast.success("Signed Out Successfully");

      navigate("/");
    });
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "users", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "users", todo.id), { completed: !todo.completed });
    toast.success("Todo Updated Completed");
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted Successfully");
  };

  return (
    <div>
      <div className="title">
        <h1>To do App </h1>
      </div>

      <ToDo />
      <div className="todo_container">
        {todos.map((todo) => (
          <CrudTodo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      <div className="container">
        <Button variant="contained" onClick={SignOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;
