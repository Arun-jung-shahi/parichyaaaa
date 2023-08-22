import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email ,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [auth,setAuth] =useAuth()
  const navigate = useNavigate();


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post("/api/v1/auth/login",{email,password});
        if(res.data.success){
            toast.success(res.data.message)
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
                
            });
            localStorage.setItem('auth',JSON.stringify(res.data))// we are converting into stringy becsue local 
            //storage only stores stringy
            navigate("/");
        }
        else{
            toast.error(res.data.message);
        }

    } catch (error) {
        console.log(error);
    }
  }
  return (

   
   <Layout>
         <>
    <div>

        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type='email' placeholder='enter you email' value={email} onChange={(e)=>setEmail(e.target.value)} required></input><br/><br/>
            <input type='password' placeholder='enter you password' value={password} onChange={(e)=>setPassword(e.target.value)} required></input><br/><br/>
            <button
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
        

          <button type="submit" >
            LOGIN
          </button>
          
        </form>
    </div>
      
    </>
    </Layout>
  )
}

export default Login;


