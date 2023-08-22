import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {Checkbox,Radio} from 'antd'
import axios from 'axios'
import { Price } from '../components/Price'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import { toast } from 'react-hot-toast'

const Home = () => {
  const navigate =useNavigate();
  const [products,setProducts]=useState([])
  const [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([])
  const[radio,setRadio]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const [cart,setCart]=useCart();
  //get total
  const getTotal =async()=>{
    try {
      const {data}=await axios.get(`/api/v1/product/product_count`)
      console.log(data)
      setTotal(data?.total)

    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  // get all products
  const getAllProducts =async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`/api/v1/product/product_list/${page}`)
     setLoading(false)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(!checked.length||!radio.length){
    getAllProducts();
    }
  },[checked.length,radio.length])

  //get all catergory
  const getAllCategory=async()=>{
    const {data}=await axios.get(`/api/v1/category/get_category`)
    if(data?.success){
    setCategories(data?.category)
    }
  }

  useEffect(()=>{
getAllCategory()
getTotal()
  },[])
//handel filter
  const handleFilter=(value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }
    else{
      all =all.filter((c)=>c!==id)
    }
    setChecked(all)
  }

  //get product filter controller
  const ProductFilter=async()=>{
    try {
    
      const {data}=await axios.post("/api/v1/product/product_filter",{checked,radio})
    setProducts(data?.product)
    }
     catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(checked.length||radio.length)
    ProductFilter();
    
  },[checked,radio])

  //loadmore
  //need to know more
  const loadMore=async()=>{
   try {
    setLoading(true)
    const {data}=await axios.get(`/api/v1/product/product_list/${page}`)
  setLoading(false)
  setProducts([...products,...data?.products])
   } catch (error) {
    console.log(error)
    setLoading(false)
   }
  }
  useEffect(()=>{
    if(page===1)return;
    loadMore()
  },[page])


  return (
    <>
      <Layout>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <h4 className='text-center'>Filter by category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className='col-md-9'>
          {/* {JSON.stringify(radio,null,4)}
          {JSON.stringify(checked,null,4)} */}
        <h1 className='text-center'>All product </h1>
<div className='d-flex flex-wrap'> 
{
  products?.map((p)=>(
    <div className="card m-2" style={{ width: "18rem" }}>
    <img
      src={`/api/v1/product/product_photo/${p._id}`}
      className="card-img-top"
      alt={p.name}
    />
    <div className='card-body'>
      <h5 className='card-title'>{p.name}</h5>
      <h5 className="card-title card-price">${p.price}</h5>
      <p className='card-text'>{p.description.substring(0,30)}.....</p>
      <button class="btn btn-primary ms-1"   
      onClick={()=>navigate(`/product/${p.slug}`)}
      >More Details</button>
      <button class="btn btn-secondary ms-1"
      onClick={()=>{setCart([...cart,p])
        localStorage.setItem("cart",JSON.stringify([...cart,p]))
        toast.success("item added to cart")
      }}
      
      >ADD TO CART</button>
      </div>
    </div> 
  ))
}

</div>
<div className="m-2 p-3">
{
  // console.log(products.length)
  console.log(total)
}  
{

products && products.length < total &&(
     <button
     className="btn loadmore"
     onClick={(e) => {
       e.preventDefault();
       setPage(page + 1);
     }}
   >
     {loading ?   "Loading ...":"loadmore"}
</button>
)
    }
</div>
 </div>
</div>
      </Layout>
    </>
  )
}

export default Home
