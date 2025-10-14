import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGoal, cancelEditingGoal, updateGoal } from '../features/goals/goalSlice'

function GoalForm() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const { editingGoal } = useSelector((state)=> state.goals)
    
    useEffect(()=>{
        editingGoal ? setText(editingGoal.text) : setText('')
    }, [editingGoal])

    const onSubmit = (e)=>{
        e.preventDefault()
        if(!editingGoal)
        {
            dispatch(createGoal({text}))
        }
        else 
        {
            dispatch(updateGoal({
                id: editingGoal._id,
                text
            }))
        }
        setText('')
    } 
    
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label htmlFor="text">Goal text</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="text" 
                    name = 'text' 
                    value = {text} 
                    onChange={(e)=>setText(e.target.value)} placeholder="Text" required />
                </div>
                {editingGoal ? 
                (
                <div className="" style={{display: "flex", justifyContent: "space-between", gap:"10px"}}>
                    <button className="btn btn-block" style={{width: "80%"}} type='submit'>Edit Goal</button>
                    <button className="btn btn-block" style={{width: "20%", backgroundColor: "white", color: 'black'}}type="button" onClick={()=> dispatch(cancelEditingGoal())}>Cancel</button>
                </div>
                ) : (
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add Goal</button>
                </div>)}
            </form>
        </section>
    )
}

export default GoalForm