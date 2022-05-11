const {Schema, model} = require('mongoose');

// TODO:
// thoughs array needs to refer to the Thought model. I don't know if that requires specific code to do
// friends array needs to refer back to the User model (self-reference)
// Schema Settings: virtual called friendCount that retrieves the length of the user's friends array field

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

// TODO TODO TODO
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

userSchema.set('toJSON', {virtuals: true});
const User = model('User', userSchema);

module.exports = User;