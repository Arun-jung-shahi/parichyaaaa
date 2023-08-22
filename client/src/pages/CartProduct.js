import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-hot-toast'
const CartProduct = () => {
    const [cart,setCart]=useCart();
    const [auth]=useAuth();
    const [clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState("");
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();

//get payment gateway token
const getToken=async()=>{
  try {
    const {data}= await axios.get("/api/v1/product/braintree/token")
    
    setClientToken(data?.clientToken)
    
  } catch (error) {
    console.log(error)

  }
}
// {console.log(clientToken)}


useEffect(()=>{
  getToken()
},[auth?.token])

//payment
const handlePayment=async()=>{
 try {
  setLoading(true)
  const { nonce } = await instance.requestPaymentMethod();
  const {data}=await axios.post(`/api/v1/product//braintree/payment`,{nonce,cart})
  setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
 } catch (error) {
  console.log(error);
      setLoading(false);
 }
}



    //delete product
    const removeCartItem=async(id)=>{
try {
    let myCart=[...cart]
    let index =myCart.findIndex(item=>item._id===id)
    myCart.splice(index,1)
    setCart(myCart);
    localStorage.setItem("cart",JSON.stringify(myCart));
} catch (error) {
  console.log(error)  
}
    }

  //total price
  const totalPrice=()=>{
    try {
        let total=0
        cart?.map(item=>{
            total=total+item.price
        })
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
    } catch (error) {

        console.log(error)
        
    }
  }  

  return (
    <Layout>
        <div className='cart-page'>
<div className='row'>
    <div className="col-md-12">
    <h4 className="text-center bg-light p-2 mb-1">
        {!auth?.user?
         "hello Guest":`hello ${auth?.token&&auth?.user?.name}`}
     <p className="text-center">
        {
            cart?.length?`you have ${cart.length} items in your cart ${
                auth?.token?"":" please login to checkout "}`:"your cart is empty"
        }

        </p>
    </h4>
    </div>
</div>
<div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
                {
                    cart?.map((p)=>(
                        <div className="row card flex-row me-3" key={p._id}>
                         <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product_photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button  className="btn btn-danger mt-5" 
                    onClick={()=>removeCartItem(p._id)}
                    >
remove
                    </button>
                  </div>
                         
                            </div>
                    ))
                }
                </div>
                <div className="col-md-5 cart-summary " >
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr/>
              <h4> Total:{totalPrice()}</h4>
              {
                auth?.user?.address ?(
                  <div>
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button    className="btn btn-outline-warning"
                    onClick={()=>navigate(`/dashboard/user/profile`)}
                    >
                      Updata Address
                    </button>
                  </div>
                ):(
                
                  <div className="mb-3">
                    {
                      auth?.token ?( 
                      <button    className="btn btn-outline-warning"
                      onClick={()=>navigate(`/dashboard/user/profile`)}
                      >
                        Updata Address
                      </button> 
                      ):(
                        <button className="btn btn-outline-warning" onClick={()=>navigate(`/login`,{  state: `/cart`
                      })}>
                          Plz Login To Checkout
                        </button>
                      )
                    }
                  </div>
                  
                )
              }
              <div className="mt-2">
                {
                  !clientToken||!auth?.token||!cart.length ? (""):(
<>
                <DropIn options={{
                  authorization:clientToken, 
                  paypal:{
                    flow:"vault"
                  },
                }}
                onInstance={(instance=>setInstance(instance)
                )}/>
                  <button     className="btn btn-primary"  
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading?"processing....":"make payment"}
                    
                     
                  </button>
                  

                </>
                  )
                }
                
              </div>
              </div>
                </div>
                </div>
        </div>
    </Layout>
  )
}

export default CartProduct
