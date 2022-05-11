const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    reactionBody: {type: String, required: true, maxlength: 280},
    username: { type: String, required: true },
    createdAt: {type: Date, default: Date.now, get: date => date.toLocaleString()}
},
{
    _id: false,
});

reactionSchema.set('toJSON', {getters: true});
reactionSchema.set('toObject', {getters: true});

const thoughtSchema = new Schema({
    thoughtText: {type: String, required: true, maxlength: 280, minlength: 1},
    username: {type: String, required: true, ref: 'User'},
    reactions: [reactionSchema],
    createdAt: {type: Date, default: Date.now, get: (date) => date.toLocaleString()}
});


// TODO TODO
thoughtSchema.virtual('reactioncount').get(function(){
    return this.reactions.length;
})
thoughtSchema.set('toJSON', {getters: true, virtuals: true});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
