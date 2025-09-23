
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
//@desc Get goals
//@route GET: api/goals 
const getGoal = asyncHandler(async (req,res) => {

    let goals
    if(req.params.id)
    {
        goals = await Goal.findById(req.params.id)
    }
    else goals = await Goal.find()

    res.status(200).json(goals)
})

//@desc Post goals
//@route POST: api/goals
const postGoal = asyncHandler(async (req,res) => {

    if(!req.body?.text)
    {
        res.status(400)
        throw new Error('Please add a text field!')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json({
        goal
    })
})

//@desc Put goals
//@route PUT: api/goals/:id

const putGoal = asyncHandler(async (req,res) => {
    const goal  = await Goal.findById(req.params.id)
    if(!goal)
    {
        res.status(400)
        
        throw new Error('Goal not found!')
    }

    // new : true là trả về document sau khi update
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json({
        updatedGoal
    })
})

//@desc Delete goals
//@route DELETE: api/goals/:id
const deleteGoal = asyncHandler(async (req,res) => {

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

    if (!deletedGoal) {
        return res.status(404).json({ message: 'Goal not found' })
    }

    res.status(200).json({ message: 'Goal deleted successfully' })
})

module.exports = {
    getGoal, postGoal, putGoal, deleteGoal
}