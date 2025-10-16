
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
//@desc Get goals
//@route GET: api/goals 
const getGoal = asyncHandler(async (req,res) => {

    const goals = await Goal.find({user: req.user.id})

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
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(
        goal
    )
})

//@desc Put goals
//@route PUT: api/goals/:id

const putGoal = asyncHandler(async (req,res) => {
    const goal  = await Goal.findById(req.body.id)
    if(!goal)
    {
        res.status(400)
        
        throw new Error('Goal not found!')
    }
    if(!req.user)
    {
        res.status(401)
        throw new Error('User not found!')
    }

    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('User not authorized!')
    }
    // new : true là trả về document sau khi update
    const updatedGoal = await Goal.findByIdAndUpdate(req.body.id, {text: req.body.text}, {
        new: true,
    })

    res.status(200).json(
        updatedGoal
    )
})

//@desc Delete goals
//@route DELETE: api/goals/:id
const deleteGoal = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        return res.status(404).json({ message: 'Goal not found' })
    }

    if(!req.user)
    {
        res.status(401)
        throw new Error('User not found!')
    }

    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('User not authorized!')
    }

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    if(!deletedGoal)
    {
        res.status(401)
        throw new Error('Goal delete failed!')
    }

    res.status(200).json({ 
        message: 'Goal deleted successfully',
        id: req.params.id
     })
})

module.exports = {
    getGoal, postGoal, putGoal, deleteGoal
}