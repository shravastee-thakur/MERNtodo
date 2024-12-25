import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout");
      if (res.data.success) {
        alert(res.data.message);
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-600">
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">{"Todo app"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
