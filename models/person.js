const mongoose = require('mongoose');

// define the schema (the shape that will got)
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // mandatory
  age: Number,                            // optional field
  favoriteFoods: [String]                 // string array
});

// model from the schema
const Person = mongoose.model('Person', personSchema);

// export the model to use in other files
module.exports = Person;
