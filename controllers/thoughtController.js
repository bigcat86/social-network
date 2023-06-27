const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        console.log('get all thoughts');
        Thought.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        console.log('get this thought');
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}