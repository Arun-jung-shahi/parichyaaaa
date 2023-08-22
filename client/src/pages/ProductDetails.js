import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

    const params =useParams();
    const [product,setProduct]=useState({})
    const [related,setRelated]=useState([])

    //get single product
const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`/api/v1/product/single_product/${params.slug}`)
        setProduct(data?.products)
        relatedProduct(data?.product._id,data?.product.category._id)
    } catch (error) {
        console.log(error)
    }
}

const relatedProduct=async(pid,cid)=>{
    try {
        const {data}= await axios.get(`/api/v1/product/similar/${pid}/${cid}`)
    setRelated(data?.products)
    } catch (error) {
        console.log(error)
    }
}


useEffect(()=>{
    if(params.slug)
getSingleProduct()
},[params?.slug])
    return (
    <Layout>
       <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product_photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6> price:{product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
          </div>
          <div className="row container similar-products">
        <h4>Similar Products </h4>
        {related?.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {related?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className='card-body'>
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <button className='btn btn-secondary ms-1'>add to cart</button>
                </div>
              

          
              </div>
          ))
          }
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default ProductDetails
