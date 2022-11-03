import {Link} from 'react-router-dom'
import React,{Component, useState} from "react";
import { useNavigate } from "react-router-dom";


import DescPage from './DescPage';
import { useEffect } from 'react';




 
function Cards({item,props }) {
  const { id,name, price} = item;
  
  const [qtyHm, setQtyHm] = useState(1)
  let navigate=useNavigate();
  console.log(qtyHm)
  




const increaseQty = (arg) => 
{
    const qty=arg
    setQtyHm(qty);

   console.log('Increase Call',qty)
}
 
const updateQuantity = (e)=>
{
      const qty1=e.target.value
      setQtyHm(qty1)
    console.log('Input Qty',qty1)

}

//   useEffect(
//     ()=>
//     {
//       console.log()
//     }
//   )

 
  const addToCart=(id,qtyHm)=>
  {
      const productID=id
      const cartID=1
      const quantity=qtyHm
      console.log(id,'Here is id')
  
    
          const addCart =  {productID,cartID,quantity}
          console.log(addCart);
          fetch("http://localhost:8080/os/addProductToCartItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addCart)
          }).then(res => res.text())
            .then((result) => {
            //   alert(result);
              window.location.reload();
              // navigate("/userLogin");
            });
       
  
  };
  

 
  return (
      <>
    
    

    <div className="cards">

      
      <div className="image_box">
          <img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946'/>
        
      </div>
      <div className="details">
      
  
        {/* <p>{id}</p> */}
        
        <span onClick={() => {
            navigate("/descPage",{state:{id:id,name:name,price:price}});
          }}>{name}</span>
        
        
        {/* <DescPage itemName={name}>
        </DescPage> */}
    
        <p><span class="WebRupee">&#x20B9;</span>{price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Rs</p>
        <span> <select onChange={(e)=>{const selectedQntty=e.target.value; setQtyHm(selectedQntty);}}>
                
       
        < option value="1" > 1</option>
        < option value="2" > 2</option>
        < option value="3" > 3</option>
        < option value="4" > 4</option>
        < option value="5" > 5</option>
        < option value="6" > 6</option>
        < option value="7" > 7</option>
        < option value="8" > 8</option>
        < option value="9" > 9</option>
                
               
                <option>10+
                <input type='text' value={qtyHm}  onChange={(updateQuantity)}></input>

                </option>
            </select></span>
      
        <button onClick={()=>addToCart(id,qtyHm)}>Add to Cart</button>
      </div>
    </div>
    </>
  );
};


export default Cards;



// name,price

// id, title, autor, price, img
