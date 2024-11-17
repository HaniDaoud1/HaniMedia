import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, profession } =
      req.body;

    // Check if all fields are provided
    if (
      !firstName ||
      !email ||
      !password ||
      !location ||
      !profession ||
      !req.file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // File path to save in the database (relative path)
    const picture = req.file.filename;

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      location,
      profession,
      picture, // Save the filename in the database
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send the saved user data as the response
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(500).json({ msg: "Utilisateur non existat." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(500).json({ msg: "Mot de pass non correct." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECURE);
    delete user.password;
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
