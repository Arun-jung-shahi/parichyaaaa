
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
// import Link from 'antd/es/typography/Link'
import { Link } from 'react-router-dom'

const Product = () => {


    const [products,setProduct]=useState([])

    //get all products
    const getAllProduct = async()=>{
        try {
        const {data}= await axios.get("/api/v1/product/get_product")    
        // console.log(data)
        setProduct(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Someething Went Wrong");
        }
    }
    // console.log(products)
    useEffect(()=>{
getAllProduct()
    },[])
  return (
<Layout>
<div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          < div className="d-flex flex-wrap">
       
          {
          
            products?.map((p)=>(
  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
 <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product_photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>

  </Link>
            ))
          }
          </div>
</div>
        </div>

</Layout>
  )
}

export default Product
