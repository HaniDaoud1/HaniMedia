import express from "express";
import { verifyToken } from "../meadelwear/auth.js";
import {
  getFeedPost,
  getUserPost,
  likePosts,
  addComment,
  likedPosts,
  getUserPost2,
  DeletePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPost);
router.get("/:_id/post", verifyToken, getUserPost);
router.get("/:userId/posts", verifyToken, getUserPost2);
router.get("/:_id", verifyToken, likedPosts);

router.patch("/:id/like", verifyToken, likePosts);
router.post("/:id/comment", verifyToken, addComment);

router.delete("/:_id/delete", verifyToken, DeletePost);

export default router;
