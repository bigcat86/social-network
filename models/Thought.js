const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: local
    },
    user_username: {
        type: String,
        required: true,
        ref: 'user'
    },
    reactions: [reactionSchema]  
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

function local(date) {
  return date.toLocaleDateString('en-US');
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought; 


