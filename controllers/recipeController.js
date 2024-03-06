const Recipe = require('../models/recipe');

async function getAllRecipes(req, res, next) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
}

async function getRecipeById(req, res, next) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
}

async function createRecipe(req, res, next) {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ recipe });
  } catch (error) {
    next(error);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
