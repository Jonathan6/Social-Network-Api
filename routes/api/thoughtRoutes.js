const router = require('express').Router();
const { Thought, Reaction } = require('../../models/Thought');
const { User } = require('../../models/User');

// get all thoughts
router.get('/', async (req,res) => {
    try {
        const thoughtData = await Thought.find();
        res.json(thoughtData);
    } catch(err) {
        res.status(500).json();
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
        // Creates new Thought and saves it to the db
        const newThought = new Thought({ 
            thoughtText: req.body.thoughtText, 
            username: req.body.username
        });
        newThought.save();

        // Finds the corresponding user and adds the newThought ID to the thoughts array
        const userData = await User.find(req.body.username);
        userData.thoughts.push(newThought._id);
        userData.save();

        res.json(thoughtData);
    } catch(err) {
        res.status(500).json();
    }
})


// put to update a thought by its _id
router.put('/:thoughtId', async (req,res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {...req.body});
        res.json( userData );
    } catch(err) {
        res.status(500).json();
    }
});


// delete to remove a thought by its _id
router.delete('/:thoughtId', async (req,res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete(req.params.thoughtId);
        res.json( thoughtData );
    } catch(err) {
        res.status(500).json();
    }
});



// api/thoughts/:thoughtId/reactions
// post to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', (req,res) => {
    try {
        const thoughtData = Thought.findById(req.params.thoughtId);
        const newReaction = new Reaction({
            reactionBody: req.body.reactionBody,
            username: thoughtData.username }
        );
        thoughtData.reactions.push(newReaction);

        res.status(200).json(newReaction);
    } catch(err) {
        res.status(500).json();
    }
});

// delete to pull and remove a reaction by the reaction's reactionId value
router.post('/thoughts/:thoughtId/reactions/:reactionId', (req,res) => {
    try {
        const thoughtData = Thought.findById(req.params.thoughtId);
        thoughtData.reactions = thoughtData.reactions.filter(reaction => reaction._id != req.params.reactionId);
        thoughtData.save();

        res.status(200).json(newReaction);
    } catch(err) {
        res.status(500).json();
    }
});

module.exports = router;