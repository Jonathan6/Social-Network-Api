const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: {type: String, required: true, maxlength: 280},
    username: { type: String, required: true },
  },
  {
    timestamps: {createdAt: 'created_at'}
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, maxlength: 280, minlength: 1},
    username: {type: String, required: true},
    reactions: [reactionSchema],
    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    timestamps: {createdAt: 'created_at'}
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;
