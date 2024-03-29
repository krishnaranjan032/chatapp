import express from "express";

import authenticate from "../middlewares/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/:chatId").get(authenticate, allMessages);
router.route("/").post(authenticate, sendMessage);

export default router;
