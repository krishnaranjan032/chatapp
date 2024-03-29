import express from "express";

import authenticate from "../middlewares/authMiddleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chat.controller.js";

const router = express.Router();

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChats);
router.route("/group").post(authenticate, createGroupChat);
router.route("/rename").put(authenticate, renameGroup);
router.route("/groupremove").put(authenticate, removeFromGroup);
router.route("/groupadd").put(authenticate, addToGroup);

export default router;
