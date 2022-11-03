import Header from './components/Header';
import Footer from './components/Footer';
import DescPage from './components/DescPage';
import Cart from './components/Cart';

import Home from './components/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/header' element={<Header/>} />
    <Route path='/footer' element={<Footer/>} />
    <Route path='/descPage' element={<DescPage/>} />
    <Route path='/cart' element={<Cart/>} />



  
  </Routes>
  </BrowserRouter>
  );
}

export default App;
