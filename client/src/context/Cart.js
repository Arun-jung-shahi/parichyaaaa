
import React,{useState,
    
    useContext,
    useEffect,
  
    createContext
    } from 'react'
    // import axios from 'axios';


      const CartContext=createContext(); 
    
///////create context
    // createContext is a function provided by React that creates a context object.
    //  A context object allows you to share data across multiple components without explicitly passing the props through each level of the component tree.
    //  It acts as a central store for data that can be accessed by any component within its hierarchy.


///////use context
    // Once you have created a context object using createContext,
    //  you can use the useContext hook to access the data stored in the context within a functional component.

    

   

    const CartProvider=({children})=>{ //copy ma cha we kmow provider and consumer tyo searchprovider is a provider which provide 
        //the data to be shared  so const[auth,setauth ma bhako data is we want to share globally you know]
        const [cart,setCart]=useState([]);
        
        
        
        useEffect(()=>{
            let existingCartItem=localStorage.getItem("cart")
            if(existingCartItem) setCart(JSON.parse(existingCartItem));
        },[]);
    

    return(//its consumer and we want to share sabai ma globally so share garney data lai we need to put in consumer to share gloablly
        <CartContext.Provider value={[cart,setCart]}>
            {children}
            </CartContext.Provider>
    )
    }
const useCart =()=>useContext(CartContext)//and we know consumer ma bhako data lai share garnu lai we have usecontext hooks ani tesma wrap garchau
export {useCart,CartProvider};
