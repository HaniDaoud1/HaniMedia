import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = await req.params;
    console.log(id);
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserFreinds = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattfriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(201).json(formattfriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUsersNotFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve all users from the database
    const allUsers = await User.find({});

    // Filter out users who are friends with the given user
    const notFriends = allUsers.filter(
      (potentialFriend) =>
        !user.friends.includes(potentialFriend._id.toString()) &&
        potentialFriend._id.toString() !== id
    );

    // Format the response for the users who are not friends
    const formattedNotFriends = notFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedNotFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUsers2 = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve all users from the database
    const allUsers = await User.find({});

    // Filter out users who are friends with the given user
    const notFriends = allUsers;

    // Format the response for the users who are not friends
    const formattedNotFriends = notFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedNotFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addRemouveUser = async (req, res) => {
  try {
    const { id, friendsId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendsId);

    if (user.friends.includes(friendsId)) {
      user.friends = user.friends.filter((id) => id !== friendsId);
      friend.friends = friend.friends.filter((id) => {
        id !== id;
      });
    } else {
      user.friends.push(friendsId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const formattfriends = await Promise.all(
      user.friends.map(async (friendId) => {
        const friendDetails = await User.findById(friendId);
        const { _id, firstName, lastName, occupation, location, picturePath } =
          friendDetails;
        return { _id, firstName, lastName, occupation, location, picturePath };
      })
    );
    res.status(201).json(formattfriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
