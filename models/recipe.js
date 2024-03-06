const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  // other recipe fields
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
