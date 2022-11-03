
import './style/home.css'
import './style/cart.css'
import './style/Footer.css'
import Footer from './Footer'
import Header from './Header'
import Cards from './Card'

import React,{useState,useEffect} from 'react';
const Home = () => {  
    const [product, setProduct] = useState([]);

useEffect(() => {
        
  fetch("http://localhost:8080/os/getAllProduct")
      .then(res => res.json())
      .then((result) => {
          setProduct(result);
      }
      )
}, [])
console.log(product)

const list=product;



  return (
      <>
      <Header/>
    <section>
      {product.map((item) => (
        <Cards key={item.id} item={item} >
        {
        console.log(item.id)}
        {
        console.log(item)
        
        }

        </Cards>


      ))}
      
     
    </section>
    <Footer/>
    </>
    
  );
};

export default Home;