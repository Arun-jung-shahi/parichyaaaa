import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const [categories,setCategories]=useState([])

   const getALLcategories=async()=>{
    try {
        const {data}= await axios.get("/api/v1/category/get_category")
        setCategories(data?.category)
    
    } catch (error) {
        console.log(error)
    }

   }

    useEffect(()=>{
        getALLcategories();
    },[])

    return categories;
}