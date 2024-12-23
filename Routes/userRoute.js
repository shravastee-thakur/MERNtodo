import express from "express";
const router = express.Router();
import { register, login } from "../Controllers/userController.js";

router.post("/register", register);
router.post("/login", login);

export default router;
