import express from "express";
import { allUsers, authUser, registerUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(authenticate, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);

export default router;