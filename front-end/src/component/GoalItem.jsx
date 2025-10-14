import { useDispatch } from "react-redux"
import { deleteGoal, startEditingGoal } from '../features/goals/goalSlice'

function GoalItem({goal}) {
  const dispatch = useDispatch()

  return (
    <div className="goal" onClick={() => dispatch(startEditingGoal(goal))} style={{cursor: "pointer"}}>
        <span className="date">
            Ngày tạo: {new Date(goal.createdAt).toLocaleString('vi-VN')}
        </span>
        <h2>{goal.text}</h2>
        <button onClick={(e)=>{
          e.stopPropagation()
          dispatch(deleteGoal(goal._id))
        }}className="close">X</button>
    </div>
  )
}
 
export default GoalItem