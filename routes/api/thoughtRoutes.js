const router = require('express').Router();
const { Thought, User } = require('../../models');
const mongoose = require('mongoose');

// get all thoughts
router.get('/', async (req,res) => {
    try {
        const thoughtData = await Thought.find();
        console.log(thoughtData);
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get a single thought by its _id
router.get('/:thoughtId', async (req,res) => {
    try {
        const thoughtData = await Thought.findById(req.params.thoughtId);
        res.json(thoughtData);
    } catch(err) {
        res.status(500).json();
    }
});


// TODO im not sure what to do about the user_id foreign key
// post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', async (req,res) => {
    try {

        const user = await User.findOne({ username: req.body.username});
        // Creates new Thought and saves it to the db
        const newThought = await Thought.create(req.body);
        // Finds the corresponding user and adds the newThought ID to the thoughts array
        newThought.save();
        user.thoughts.push(newThought._id);
        user.save();

        res.json(newThought);
    } catch(err) {
        res.status(500).json();
    }
})


// put to update a thought by its _id
router.put('/:thoughtId', async (req,res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate( req.params.thoughtId, { $set: req.body}, {new: true});
        res.json( thoughtData );
    } catch(err) {
        res.status(500).json();
    }
});


// delete to remove a thought by its _id
router.delete('/:thoughtId', async (req,res) => {
    try {
        const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (thoughtData) {
            console.log(thoughtData);
        }
        await User.updateOne({username: thoughtData.username}, {$pull: {thoughts: mongoose.Types.ObjectId(req.params.thoughtId)}});
        res.json(thoughtData);
    } catch(err) {
        res.status(500).json();
    }
});



// api/thoughts/:thoughtId/reactions
// post to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        await Thought.updateOne({_id: mongoose.Types.ObjectId(req.params.thoughtId)}, {$push: {reactions: {...req.body}}});
        res.status(200).json();
    } catch(err) {
        res.status(500).json();
    }
});

// delete to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req,res) => {
    try {
        await Thought.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.thoughtId)}, {$pull: {reactions: mongoose.Types.ObjectId(req.params.reactionId)}});

        res.status(200).json("works!");
    } catch(err) {
        res.status(500).json();
    }
});

module.exports = router;