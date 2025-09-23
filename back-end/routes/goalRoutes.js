const express = require('express')
const router = express.Router()
const { getGoal, postGoal, putGoal, deleteGoal } = require('../controllers/goalController') 

//router.get('/', getGoal)
//router.post('/', postGoal)
router.route('/').post(postGoal)
router.route(`/{:id}`).get(getGoal)
//tuong tu cho :id
router.route('/:id').put(putGoal).delete(deleteGoal)
    
module.exports = router