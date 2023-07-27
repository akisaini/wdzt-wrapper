require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017/';
const mongoose = require("mongoose");
const db = mongoose.connection;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.connect(
    uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => console.log("MongoDB connected")).catch(err => console.log(err));


// Check for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function(){
    console.log(err);
});

// create a schema
const pyramidSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

// create a schema
const carSchema = new mongoose.Schema({
    model_year: Number,
    name: String,
});

// pyramidSchema is schema name
// Pyramid is model name

// create a model with pyramidSchema
const Pyramid = mongoose.model('Pyramid', pyramidSchema);
const Car = mongoose.model('Car', carSchema)

// Create a new document
const p1 = new Pyramid({
    id: 1001,
    name: 'Akshat Saini'
});

const car1 = new Car({
    id: 2024,
    name: 'SF90'
});


// Add document to Collection
p1.save().then(() => console.log("Entry added"), (err) => console.log(err));
car1.save().then(() => console.log("Entry added"), (err) => console.log(err));


// get documents from collection
app.get('/', async (req, res) => {
    try {
      const entries = await Pyramid.find();
      res.json(entries);
    } catch (error) {
      console.error('Error retrieving entries:', error);
      res.status(500).send('Error retrieving entries');
    }
  });


// use repo with mongodb
  