import { useState, useEffect } from "react"
import { FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import Spinner from '../component/Spinner'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess,message} = useSelector((state) => state.auth)
  useEffect(()=>{
    if(isError)
    {
      toast.error(message)
    }

    if(isSuccess || user)
    {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange =  (e) =>{
    //set lại dữ liệu (function setFormData) từ dữ liệu trên form (...prevState: để giữ đầy đủ props của object)
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit =  (e) =>{
    //ngăn không reload khi submit
    e.preventDefault()
    const userData = {
      email, password
    }

    dispatch(login(userData))
  }

  if(isLoading)
  {
    return <Spinner/>
  }

  return (
    <>  
      <section className="heading">
        <h1>
          <FaSignInAlt/> LOGIN 
          <p>Đăng nhập</p>
        </h1>
      </section>
      <section className="content">
        <section className="form">
          <form onSubmit={onSubmit}>
              
              <div className="form-group"> 
                <input type="email" className="form-control" id="email" name = 'email' value = {email} onChange={onChange} placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" name = 'password' value = {password} onChange={onChange} placeholder="Mật khẩu" required />
              </div>

              <div className="form-group">
                <button type ='submit' className="btn btn-block">Xác nhận</button>
              </div>
          </form>
        </section>
      </section>
    </>
  )
}

export default Login