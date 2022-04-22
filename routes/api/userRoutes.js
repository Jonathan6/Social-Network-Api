const router = require('express').Router();
const { User } = require('../../models/User');

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
        res.json( userData);
    } catch(err) {
        res.status(500).json();
    }
});

// Post new user
router.post('/', async (req,res) => {
    try {
        const newUser = new User(
            { username: req.body.username ,
            email: req.body.email }
        );
        newUser.save();

        res.status(200).json(newUser);
    } catch(err) {
        res.status(500).json();
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
        const userData = await User.findById(req.params.userId);
        userData.friends = [...userData.friends, req.params.friendId];
        userData.save();

        res.json(userData);
    } catch(err) {
        res.status(500).json();
    }
});

// delete to remove a friend from a user's friend list

router.delete('/:userId/friends/:friendId', async (req,res) => {
    try {
        const userData = await User.findById(req.params.userId);
        userData.friends = userData.friends.filter(id => id != req.params.friendId);
        userData.save();

        res.json(userData);
    } catch(err) {
        res.status(500).json();
    }
});

module.exports = router;
