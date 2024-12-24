import express from "express";
const router = express.Router();
import { register, login, logout } from "../Controllers/userController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
