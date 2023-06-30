// const { ObjectId } = require("mongoose").Types;
// const { Schema } = require("mongoose");
const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    console.log("get all users");
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    console.log("get this user");
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    console.log("creating a user");
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    console.log("deleting user");
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no such user exists" })
          : Thought.deleteMany({ username: { $in: user.username } })
      )
      .then(() => res.json({ message: "User and thoughts deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    console.log("updating this user");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log("Adding friend to user");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user by that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    console.log("Removing friend from user");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Aint no user wit dat ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

