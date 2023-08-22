import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../Pagecss/registration.css'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Regestration = () => {

  const [name ,setName]=useState("")
  const [email ,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [phone ,setPhone]=useState("") 
  const [address,setAddress]=useState("");
  const [answer, setAnswer] = useState("");
  
  const navigate = useNavigate();

  const handelSubmit =async(e)=>{
    e.preventDefault()
    try {
     
      const res = await axios.post("/api/v1/auth/register"
      ,{name,email,password,phone, address,answer,});
      if(res.data.success){

toast.success(res.data.message)
navigate('/Login')

      }
      else{
        toast.error(res.data.message)
        
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error("errorrr")
    }
  }

  return (
    <>
    <Layout>
      <div className='registration'>
        
        <form onSubmit={handelSubmit}>
          <h2>Regestration</h2><br/>
            <input type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} required/><br/><br/>
            <input type='email' placeholder='Enter your email' value={email}  onChange={(e)=>setEmail(e.target.value)} required/><br/><br/>
            <input type='password' placeholder='Enter your password' value={password}  onChange={(e)=>setPassword(e.target.value)} required/><br/><br/>           
            <input type='number' placeholder='Enter your phone' value={phone} onChange={(e)=>setPhone(e.target.value)} required/><br/><br/>
            <input type='text' placeholder='Enter your address' value={address} onChange={(e)=>setAddress(e.target.value)} required/><br/><br/>
            
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is Your Favorite sports"
              required
            />
          
          <button type="submit" >
            REGISTER
          </button>
        </form>
      </div>
      </Layout>
    </>
  )
}

export default Regestration;
