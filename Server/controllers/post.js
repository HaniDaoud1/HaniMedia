import Post from "../models/post.js";
import User from "../models/User.js";
import { upload } from "../cloudinary.js";
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload the picture to Cloudinary and get the URL
    let picturePath = null;
    if (req.file) {
      picturePath = req.file.path; // Cloudinary URL
    }
    console.log(req.file.path + "...........");
    // Create a new post with the Cloudinary URL
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath, // Cloudinary URL
      likes: {},
      comments: [],
    });

    console.log("New post description:", description); // Log description for debugging
    await newPost.save();

    // Return all posts after creating the new one
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};
export const getFeedPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserPost2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserPost = async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await Post.find({ _id });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const { userId } = req.body; // User ID from request body

    // Find the post by its ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const isLiked = post.likes.includes(userId); // Assuming likes is a Map

    if (isLiked) {
      // If the post is already liked by the user, remove the like
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      // If not liked, add a like
      post.likes.push(userId); // Assuming likes is a Map
    }

    // Update the post with the modified likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes }, // Reference the instance's likes
      { new: true } // Return the updated document
    );

    // Respond with the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    // Catch and respond with any errors
    res.status(500).json({ message: error.message });
  }
};
export const DeletePost = async (req, res) => {
  try {
    const { _id } = req.params; // Post ID

    // Find the post by its ID
    const post = await Post.findById(_id);

    await Post.findByIdAndDelete(_id);

    // Optionally return the remaining posts
    const posts = await Post.find(); // Fetch all posts after deletion
    res.status(200).json(posts);
  } catch (error) {
    // Catch and respond with any errors
    res.status(500).json({ message: error.message });
  }
};
export const likedPosts = async (req, res) => {
  try {
    const { _id } = req.params; // Post ID

    // Find the post by its ID
    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Respond with the updated post
    res.status(200).json(post.likes);
  } catch (error) {
    // Catch and respond with any errors
    res.status(500).json({ message: error.message });
  }
};
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body; // Destructure both from req.body
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  try {
    if (comment !== null && comment !== "") {
      if (!Array.isArray(post.commentaire)) {
        post.commentaire = []; // Initialize if it's not an array
      }

      // Push the new comment and userId into the array
      post.commentaire.push({ comment, userId });
      await post.save();
    }

    // Return the updated comments array and userId
    res.status(200).json({
      commentaire: post.commentaire, // Return the entire commentaire array
      // Also return the userId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
