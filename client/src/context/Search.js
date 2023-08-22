import React,{useState,
    
    useContext,
  
    createContext
    } from 'react'

    
    const SearchContext=createContext(); 
    
///////create context
    // createContext is a function provided by React that creates a context object.
    //  A context object allows you to share data across multiple components without explicitly passing the props through each level of the component tree.
    //  It acts as a central store for data that can be accessed by any component within its hierarchy.


///////use context
    // Once you have created a context object using createContext,
    //  you can use the useContext hook to access the data stored in the context within a functional component.

    



    const SearchProvider=({children})=>{ //copy ma cha we kmow provider and consumer tyo searchprovider is a provider which provide 
        //the data to be shared  so const[auth,setauth ma bhako data is we want to share globally you know]
        const [auth,setAuth]=useState({
            keyword:"",
            result:[],
        });
    

    return(//its consumer and we want to share sabai ma globally so share garney data lai we need to put in consumer to share gloablly
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
            </SearchContext.Provider>
    )
    }
const useSearch =()=>useContext(SearchContext)//and we know consumer ma bhako data lai share garnu lai we have usecontext hooks ani tesma wrap garchau
export {useSearch,SearchProvider};
