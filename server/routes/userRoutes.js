import express from "express";
import {
  registerUser,
  login,
  getUsers,
  isAuth,
  logout
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js"; 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/", getUsers);

router.get("/is-auth", authUser, isAuth);
router.post("/logout", authUser, logout);


export default router;
