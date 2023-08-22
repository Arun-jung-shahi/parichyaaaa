import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Policy from './pages/Policy'
import Regestration from './pages/auth/Regestration'
import Login from './pages/auth/Login'
import DashBoard from './pages/user/DashBoard'


import ForgotPassword from './pages/auth/ForgetPassword'

import PrivateRoute from './components/Layout/private'
import AdminRoute from './components/Layout/AdminRoute'
import AdminDashboard from './pages/amin/AdminDashboard'
import CreateCategory from './pages/amin/CreateCategory'
import CreateProduct from './pages/amin/CreateProduct'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Product from './pages/amin/Product'
import UpdateProduct from './pages/amin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Category from './pages/Category'
import CategoryProduct from './pages/CategoryProduct'
import CartProduct from './pages/CartProduct'



export default function App() {
  return (
    <>
<Routes>
  <Route path='/'  element={<Home/>}   />
  <Route path='/search' element={<Search/>}/>
  <Route path='/product/:slug' element={<ProductDetails/>}/>
  <Route path='/categories' element={<Category/>}/>
  <Route path='/category/:slug' element={<CategoryProduct/>}/>
  <Route path='/cart' element={<CartProduct/>}/>


   {/* users */}
  <Route  path='/dashboard' element={<PrivateRoute/>}>
  <Route path="user" element={<DashBoard/>}/>
  <Route path='user/orders' element={<Orders/>}/>
  <Route path='user/profile' element={<Profile/>}/>
  </Route> 
  
  {/* admin  */}
  <Route  path='/dashboard' element={<AdminRoute/>}>
  <Route path='admin' element={<AdminDashboard/>}/>
  <Route path='admin/create-category' element={<CreateCategory/>}/>
  <Route path='admin/create-product' element={<CreateProduct/>}/>
  <Route path='admin/product' element={<Product/>}/>
  <Route path='admin/product/:slug' element={<UpdateProduct/>}/>

    </Route>
   
  


 
  <Route path='/About'  element={<About/>}   />
  <Route path='/Contact'  element={<Contact/>}   />
  <Route path='/Policy'  element={<Policy/>}   />
  <Route path='/Regestration' element={<Regestration/>}  />
  <Route path='/forgot-password' element={<ForgotPassword/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/*'  element={<PageNotFound/>}   />
  
</Routes>
    </>
  )
}
