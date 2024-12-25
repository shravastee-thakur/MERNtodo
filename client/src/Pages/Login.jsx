import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input
        value={user.email}
        name="email"
        onChange={changeHandler}
        type="text"
        placeholder="Enter your email"
      />
      <Input
        value={user.password}
        name="password"
        onChange={changeHandler}
        type="password"
        placeholder="Enter your password"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
