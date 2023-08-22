

import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'


const CreateCategory = () => {
 
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("")
  const [visible,setVisible]=useState(false)
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  
  
  
  const handleSubmit=async(e)=>{
    e.preventdefault()
    try {
      const res=await axios.post("/api/v1/category/create_category",{name})
    console.log(res.data)
      if (res.data?.success) {
        toast.success(`${name} is created`)
      getAllCategory()
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getAllCategory = async () => {
    try {
      const  response = await axios.get("/api/v1/category/get_category");
      
      console.log(response.data)
      if (response.data?.success) {
        setCategories(response.data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
      
      
    }
  }
 

  //updated 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update_category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  const handleDelete=async(pId)=>{
    // e.preventDefault()
    try {
      const {data}= await axios.delete(`/api/v1/category/delete_category/${pId}`)
      if(data.success){

        toast.success("category deleted")
        getAllCategory();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  }
  useEffect(()=>{
    getAllCategory()
  },[])

  return(
    <>

          <Layout>
            {/* <button onClick={getAllCategory}>show categories</button> */}
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">

           
            <h1>Manage categories</h1>
            <div className="p-3 w-50">
          <CategoryForm  
          
          value={name}
          setValue={setName}
          handleSubmit={handleSubmit}
          />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                  categories.map((c)=>{
                    return(
                      <>
                      <tr key={c._id}>
                           <td>{c.name}</td>
                             <td>
                          <button  onClick={()=>{setVisible(true);
                            setUpdatedName(c.name);setSelected(c)}}  className="btn btn-primary ms-2">EDIT</button>
                            {/* <button className="btn btn-primary ms-2">{c.slug}</button> */}
                            
                            <button onClick={()=>{handleDelete(c._id)}} className="btn btn-danger ms-2">delete</button>
                          </td>
                      </tr>
                      </>
                    )
                          })
                }
                </tbody>
              </table>


            </div>

            <Modal onCancel={()=>setVisible(false)}
            footer={null}
            visible={visible}
            >
              <CategoryForm
              
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              />



            </Modal>
          </div>
        </div>
      </div>
      
    </Layout>
   
 
    </>
  )


};

export default CreateCategory;

