import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/api/v1/auth/forgot-password", {
            email,
            newPassword,
            answer,
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
    
            navigate("/Login");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
  return (
    <>
    <Layout>
        <form onSubmit={handleSubmit}>
        <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email "
              required
            />
         
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              
              placeholder='enter your fav sports'
            
              required
            />
          
          
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          

          <button type="submit">
            RESET
          </button>

        </form>


    </Layout>
      
    </>
  )
}

export default ForgetPassword
