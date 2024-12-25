import React, { useEffect } from "react";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [viewTodos, setViewTodos] = useState([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/todo/", {
          withCredentials: true,
        });

        if (res.data.success) {
          setViewTodos(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  console.log(viewTodos);

  return (
    <div>
      <div className="flex items-center gap-3 mt-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add todo..."
          className="w-1/4"
        />
        <Button onClick={addTodoHandler}>Add Todo</Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2 w-1/4"
        placeholder="Add description..."
      />

      <div className="grid grid-cols-5 gap-2 mt-5">
        {viewTodos.map((todo) => (
          <Card key={todo._id}>
            <CardContent>
              <h1>{todo.title}</h1>
              <p>{todo.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
