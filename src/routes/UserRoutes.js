import express from "express";
import userController from "../controller/UserController.js";

const router = express.Router();

router
  .post("/auth/register", userController.cadastrarUsuario)
  .post("/auth/login", userController.loginUsuario)

export default router;