const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const uri = '<yourMongoDBConnectionString>'; // Replace with your MongoDB connection string

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('yourDatabase'); // Replace with your database name
    const usersCollection = db.collection('users'); // Replace with your collection name

    // Define API routes here
    app.post('/api/users', (req, res) => {
      const user = req.body;
      usersCollection.insertOne(user)
        .then(result => {
          res.status(201).send(`User added with ID: ${result.insertedId}`);
        })
        .catch(error => res.status(500).send(error));
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => console.error('Failed to connect to MongoDB', error));
