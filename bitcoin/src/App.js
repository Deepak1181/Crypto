
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Coins from './component/Coins';
import Exchanges from './component/Exchanges';
import Header from './component/Header';
import CoinDetails from './component/CoinDetails';
import Footer from './component/Footer';

function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}>Home</Route>
      <Route path='/coin' element={<Coins/>}>Coins</Route>
      <Route path='/exchange' element={<Exchanges/>}>Exchange</Route>
      <Route path='/coin/:id' element={<CoinDetails/>}>Coin</Route>
     
      
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
