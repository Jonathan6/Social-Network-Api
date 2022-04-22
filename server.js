const express = require('express');
const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://localhost:27017/socialMediaDB`;

let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

// User Routes /api/users

// Get all users
// app.get('/api/users', (req, res) => {
//   db.collection('userCollection')
//   .find({})
//   .toArray((err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// // Get single user by id
// app.get('/api/user/:id', (req, res) => {
//   db.collection('userCollection')
//   .find({_id: ObjectId(req.params.id)}),
//   (err,results) => {
//     if (err) throw err;
//     res.json(results);
//   }
// });

// Post new user
app.post('/api/user', (req, res) => {
  db.collection('userCollection').insertOne(
    {username: req.body.username, email: res.body.email},
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Put to update a user by id

app.put('/api/user/:id', (req, res) => {
  db.collection('userCollection').updateOne(
    {"_id": ObjectId(req.params.id)}, 
    {$set: {...req.body}},
    (err) => {
      if (err) throw err;
      res.send("User updated");
    }
  );
});

// Delete to remove user by id

app.delete('/api/user/delete:id', (req, res) => {
  db.collection('bookCollection').deleteOne(
    {_id: ObjectId(req.params.id)},
    (err) => {
      if (err) throw err;
      res.send("Document deleted");
    }
  );
});

// BONUS remove a user's associated thoughts when deleted


