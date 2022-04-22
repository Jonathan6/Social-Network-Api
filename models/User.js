const mongoose = require('mongoose');

// TODO:
// thoughs array needs to refer to the Thought model. I don't know if that requires specific code to do
// friends array needs to refer back to the User model (self-reference)
// Schema Settings: virtual called friendCount that retrieves the length of the user's friends array field

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
