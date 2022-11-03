import CrtFooter from './CrtFooter'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './style/DesctStyle.css'
const DescPage =() =>
{
    
    const [qtyHm, setQtyHm] = useState(1)
    console.log(qtyHm)


    const [product_by_Id, setProduct_by_Id ]= useState([]);
    
    const location=useLocation();
    const prc=product_by_Id.price

    const idFetch=location.state.id
    useEffect(() => {
        let api="http://localhost:8080/os/getProductById/"+idFetch;
       
            
      fetch(api)
          .then(res => res.json())
          .then((result) => {
              setProduct_by_Id(result);
             
          }
          )
    }, [])

    


    
    const[qty,setQty] = useState(1)
    const increaseQty = () => 
    {

       const qty1= qty+1
        setQty(qty1)
   
       console.log('Increase Call',qty1)
    }
    
    const decreaseQty = () =>
    {
        const qty1= qty-1
        if(qty1<=1)
        {
            alert('quantity can not be less than 1')
        }
        else
        {
            setQty(qty1)
   
       console.log('Decrease Qty',qty1)

        }
        
    }
   
 
const updateQuantity = (e)=>
{
      const qty1=e.target.value
      setQtyHm(qty1)
    console.log('Input Qty',qty1)

}

const addToCart=(id,qty)=>
{
    const productID=id
    const cartID=1
    const quantity=qty
    console.log(quantity,'Here is quantity')

  
        const addCart =  {productID,cartID,quantity}
        console.log(addCart);
        fetch("http://localhost:8080/os/addProductToCartItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addCart)
        }).then(res => res.text())
          .then((result) => {
            alert(result);
            // navigate("/userLogin");
            window.location.reload();
          });
     

};


  
    return(
        <div>
            <Header/>
        
    <>
    <div className="cards">

      
<div className="image_box">
<img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946'/>
        
  
</div>
<div className="details">


  
  
  <span>{product_by_Id.name}</span>
  
  {/* <DescPage itemName={name}>
  </DescPage> */}
  

  <p><span class="WebRupee">&#x20B9;</span>{prc} Rs</p>
  <button className='DescBtn'  onClick={() => increaseQty()}>+</button>

  <span> <select onChange={(e)=>{const selectedQntty=e.target.value; setQtyHm(selectedQntty);}}>
                
  < option value="1" >{qty}</option>
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

                    <button className='DescBtn'  onClick={() => decreaseQty()}>-</button>
                    <span><br></br></span>
                    <span><br></br></span>
    
  <button onClick={()=>addToCart(product_by_Id.id,qty)}>Add to Cart</button>
  <span> Here is Description: {product_by_Id.desc}</span>
  
 
</div>
</div>
</>
            <CrtFooter/>
        </div>
    )
}
export default DescPage