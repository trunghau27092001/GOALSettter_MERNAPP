const express = require('express')
const router = express.Router()
const { getGoal, postGoal, putGoal, deleteGoal } = require('../controllers/goalController') 
const { protect } = require('../middleware/authMiddleware') 

//router.get('/', getGoal)
//router.post('/', postGoal)
router.route('/').post(protect, postGoal).get(protect,getGoal).put(protect,putGoal)
//tuong tu cho :id
router.route('/:id').delete(protect,deleteGoal)
    
module.exports = router