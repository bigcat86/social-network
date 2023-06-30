// const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        console.log('get all thoughts');
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        console.log('get this thought');
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        console.log('creating a thought');
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        console.log('deleting thought');
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought ? res.status(404).json({ message: 'No such thought exists' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        console.log('updating this thought');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought ? res.status(404).json({message: 'No thought with that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        console.log('Adding reaction to thought');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought ? res.status(404).json({message: 'No thought by that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        console.log('Removing reaction from thought');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true}
        )
        .then((thought) =>
            !thought ? res.status(404).json({message: 'Aint no thought wit dat ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}
