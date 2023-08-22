import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const [name ,setName]=useState("")
  const [email ,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [phone ,setPhone]=useState("") 
  const [address,setAddress]=useState("")
  const [auth,setAuth]=useAuth();
  // const navigate=useNavigate()



  
  useEffect(()=>{
    const {email,name,address,phone}=auth?.user
    setAddress(address)
    setEmail(email)
   
    setName(name)
    setPhone(phone)
  },[auth?.user])
  const handelSubmit =async(e)=>{
    e.preventDefault()
    try {
     
      const {data} = await axios.put("/api/v1/auth/profile",{name,email,password,address,phone,});
      if(data?.error){
        toast.error(data?.error)

      }
      else{
setAuth({...auth,user:data?.updatedUser})
 let ls =localStorage.getItem("auth")

ls =JSON.parse(ls);
ls.user=data.updatedUser;
// console.log("aaa")
localStorage.setItem("auth",JSON.stringify(ls));
toast.success("Profile Updated Successfully");
      }
      
    } catch (error) {
      console.log(error)
      toast.error("error")
    }
  }
 

  // useEffect(()=>{
  //   const {email,name,address,phone}=auth?.user
  //   setAddress(address)
  //   setEmail(email)
   
  //   setName(name)
  //   setPhone(phone)
  // },[auth?.user])
  return (
    <>
      <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
      <div className='row'>
    <div className='col-md-3'>
        <UserMenu/>
        </div>
        < div className='col-md-9'>
        <div className='registration'>
        
        <form onSubmit={handelSubmit}>
          <h2>Profile</h2><br/>
            <input type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
            <input type='email' placeholder='Enter your email' value={email}  onChange={(e)=>setEmail(e.target.value)}  disabled/><br/><br/>
            <input type='password' placeholder='Enter your password' value={password}  onChange={(e)=>setPassword(e.target.value)}  /><br/><br/>           
            <input type='text' placeholder='Enter your Address' value={address} onChange={(e)=>setAddress(e.target.value)} /><br/><br/>
            <input type='number' placeholder='Enter your phone' value={phone} onChange={(e)=>setPhone(e.target.value)} /><br/><br/>
            {/* <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is Your Favorite sports"
              
            /> */}
          
          <button type="submit" >
            UPDATE
          </button>
        </form>
      </div>
        </div>

    </div>

</div>
      </Layout>
    </>
  )
}

export default Profile
