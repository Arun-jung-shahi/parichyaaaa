import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <AuthProvider>  
    <SearchProvider>
      <CartProvider>
     <BrowserRouter>
  
  <App />

</BrowserRouter>
</CartProvider>
</SearchProvider>
  </AuthProvider>

);
// as we know we want to use authaprovider ma bhako data lai to use globally so we are doing it
// since authprovider is provider now we can use data of  provider using consumer useauth in wich we have put data 
// using usecontext hook 

/*
or you can do this
ReactDOM.render(<BrowserRouter>
<App/>
</BrowserRouter>,document.getElementById('root'))


*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
