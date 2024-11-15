import express from "express";
import { verifyToken } from "../meadelwear/auth.js";
import {
  getUser,
  getUserFreinds,
  addRemouveUser,
  getUsersNotFriends,
} from "../controllers/users.js";

const router = express.Router();

//read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFreinds);

//update
router.patch("/:id/:friendsId", verifyToken, addRemouveUser);
router.get("/:id/users", verifyToken, getUsersNotFriends);

export default router;
