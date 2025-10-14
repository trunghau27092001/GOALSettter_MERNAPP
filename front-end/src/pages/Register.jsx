import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import { FaUser} from 'react-icons/fa'
import Spinner from '../component/Spinner'
import { register, reset } from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword} = formData

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
    if(password !== confirmPassword)
    {
      toast.error("Passwords do not match!")
    }
    else {
      const userData = {
        name, email,password
      }
      
      dispatch(register(userData))
    }
  }

  if(isLoading)
  {
    return <Spinner/>
  }

  return (
    <>  
      <section className="heading">
        <h1>
          <FaUser/> Register
          <p>Tạo tài khoản mới</p>
        </h1>
      </section>
      <section className="content">
        <section className="form">
          <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" id="name" name = 'name' value = {name} onChange={onChange} placeholder="Họ và tên" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" name = 'email' value = {email} onChange={onChange} placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" name = 'password' value = {password} onChange={onChange} placeholder="Mật khẩu" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="confirmPassword" name = 'confirmPassword' value = {confirmPassword} onChange={onChange} placeholder="Xác nhận mật khẩu" required />
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

export default Register