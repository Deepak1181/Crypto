import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
   <BrowserRouter>
   <App />
   </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);


export const server ="https://api.coingecko.com/api/v3"

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en