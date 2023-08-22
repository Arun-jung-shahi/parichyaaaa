import React from 'react'
// import About from '../../pages/About'
// import Contact from '../../pages/Contact'
// import Policy from '../../pages/Policy'
import FooterMenu from './FooterMenu'
import { Link } from 'react-router-dom'
import './css/Footer.css'

const Footer = () => {
  return (
    <>
    <div className="bg-dark text-light p-1">
    <h4 className="text-center">All rights reserved &copy:</h4>
    <div className='buttom-list'>

     <ul className='footer_list'>
      {
         
          FooterMenu.map((info)=>{
  return(
<>
<li className={info.className}><Link to={info.url1} className='footer_link'>{info.name}</Link></li>
</>
  )
          })
        
      }
     </ul>
    </div>
    </div>
   
      
    </>
  )
}

export default Footer
