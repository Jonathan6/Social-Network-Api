const router = require('express').Router();
const { User } = require('../../models');

// Get all users
router.get('/', async (req,res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch(err) {
        res.status(500).json();
    }
});

// Get single user by id
router.get('/:userId', async (req,res) => {
    try {
        const userData = await User.findById(req.params.userId);
        console.log(userData.thoughts);
        // userData.thoughts.filter((id) => ObjectId()
        res.json( userData);
    } catch(err) {
        res.status(500).json();
    }
});

// Post new user
router.post('/', async (req,res) => {
    try {
        User.create(req.body);
        res.status(200).json();
    } catch(err) {
        res.status(500).json(err);
    }
});

// Put to update a user by id
// TODO check if this works
router.put('/:userId', async (req,res) => {
    try {
        const userData = await User.findOneAndUpdate({_id: req.params.userId}, {...req.body});
        res.json( userData );
    } catch(err) {
        res.status(500).json();
    }
});



// /api/users/:userId/friends/:friendId
// post to add a new friend to a user's friend list

router.put('/:userId/friends/:friendId', async (req,res) => {
    try {
        const user1 = await User.findById(req.params.userId);
        const user2 = await User.findById(req.params.friendId);
        user1.friends = [...user1.friends, req.params.friendId];
        user1.save();
        user2.friends = [...user2.friends, req.params.userId];
        user2.save();

        res.json(user1);
    } catch(err) {
        res.status(500).json();
    }
});

// delete to remove a friend from a user's friend list

router.delete('/:userId/friends/:friendId', async (req,res) => {
    try {
        const user1 = await User.findById(req.params.userId);
        const user2 = await User.findById(req.params.friendId);
        user1.friends = userData.friends.filter(id => id != req.params.friendId);
        user1.save();
        user2.friends = userData.friends.filter(id => id != req.params.userId);
        user2.save();

        res.json(user1);
    } catch(err) {
        res.status(500).json();
    }
});

module.exports = router;
