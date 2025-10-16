import { useEffect } from "react"
import { useNavigate } from "react-router-dom" 
import GoalForm from "../component/GoalForm"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../component/Spinner"
import GoalItem from "../component/GoalItem"
import { getGoals,reset } from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state)=>state.auth)
  const { goals,isLoading, isError, message } = useSelector((state)=>state.goals)

  useEffect(()=>{
    if(isError)
    {
      console.log(message)
    }

    if(!user)
    {
      navigate('/login')
    }
    else dispatch(getGoals())

    return()=>{
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  return (
    <div className="content">
      <section className="heading">
        <h1>Goals Dashboard</h1>
      </section>
        
      <GoalForm/>
      
      <section className="content">
        {
          isLoading 
          ? 
          <Spinner/>
          :
          <>{goals.length > 0 ? 
        (
          <div className="goals">
            {goals.map((goal)=>(
              
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ): (
        <>Empty Goals</>
        )}</>

        }
        
      </section>
    </div>  
  )
}

export default Dashboard