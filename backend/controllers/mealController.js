const Meal = require('../models/mealModel')
const mongoose = require('mongoose')

//get all meals

const getMeals = async (req, res) => {
    const meals = await Meal.find({}).sort({createdAt: -1})

    res.status(200).json(meals)
}

//get single meal

const getMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `Meal doesn't exist`})
    }

    const meal = await Meal.findById(id)

    if (!meal) {
        return res.status(404).json({error: `Meal doesn't exist`})
    }

    res.status(200).json(meal)
}

//create meal

const createMeal = async (req, res) => {
    const {title, calories, portion} = req.body

    //add to mongo
    try {
        const meal = await Meal.create({title, calories, portion})
        res.status(200).json(meal)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete meal

const deleteMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `Meal doesn't exist`})
    }

    const meal = await Meal.findOneAndDelete({_id: id})

    if (!meal) {
        return res.status(400).json({error: `Meal doesn't exist`})
    }

    res.status(200).json(meal)
}

//update meal

const updateMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `Mealt doesn't exist`})
    }

    const meal = await Meal.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!meal) {
        return res.status(400).json({error: `Meal doesn't exist`})
    }

    res.status(200).json(meal)
}

module.exports = {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal, 
    updateMeal
}