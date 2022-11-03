import React,{Component, useState,useEffect} from "react";
import CrtFooter from './CrtFooter'
import Header from './Header'
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import './style/cart1.css'
const Cart =() =>
{
    const [cartObj, setCartObj ]= useState([]);
    const crt_id=1
    const [qtyHm, setQtyHm] = useState(1)
    let navigate=useNavigate();
   
    useEffect(() => {
        let api="http://localhost:8080/os/ShowAllCartItemProducts/"+crt_id;
        
       
            
      fetch(api)
          .then(res => res.json())
          .then((result) => {
              setCartObj(result);
          },
         
         
          )
    }, [])
    console.log('show all cart item',cartObj)

  
    
    
  
 
 const[qty,setQty] = useState(1)
 const increaseQty = (item,qty) => 
 {
    

    

    console.log('Increase Call',item,qty)
 

   

 }


 
 const decreaseQty = (item,qty) =>
 {

    console.log('Decrease Qty',item,qty)
 }


    const updateQuantity = (e)=>
    {
          const qty1=e.target.value
        console.log('Input Qty',qty1)

    }

    const updateToCart=(itm_id,qtyHm,p_id)=>
    {
        
        const itemid=itm_id
        const cartID=1
        const quantity=qtyHm
        const productID=p_id
       
        const updateCart =  {cartID,quantity,productID}
            console.log(updateCart);
            fetch("http://localhost:8080/os/updateCartItem/"+itemid, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateCart)
            }).then(res => res.text())
              .then((result) => {
                alert(result);
                // navigate("/userLogin");
                window.location.reload();
              });
         
    
    };
    
   
    const increaseQuantity=(item,qty)=>
    {
        
        const itemid=item.itemid
        const cartID=1
       


       

        const quantity=item.quantity+1
        

        const productID=item.product.id
       
        const updateCart =  {cartID,quantity,productID}
            console.log('updated val',updateCart);
        
          
            
            fetch("http://localhost:8080/os/updateCartItem/"+itemid, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateCart)
            }).then(res => res.text())
              .then((result) => {
                
                setQtyHm(quantity)
               
               
                  window.location.reload();
                
               
              });
         
    
    };


    const decreaseQuantity=(item,qty)=>
    {
        
        const itemid=item.itemid
        const cartID=1
       

        const quantity=item.quantity-1
        const productID=item.product.id
      if(quantity<=1)
      {
        alert('quantity can not be less then 1',quantity)
      }
      else
      {

      
        const updateCart =  {cartID,quantity,productID}
            console.log(updateCart);
            fetch("http://localhost:8080/os/updateCartItem/"+itemid, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateCart)
            }).then(res => res.text())
              .then((result) => {
                window.location.reload();
                
                // navigate("/userLogin");
              });
            }
         
    
    };
    

 
    var totalPriceArr=[];

    
    cartObj.map((item)=>
    {
        // console.log( item.product.price,item.quantity)
       
        totalPriceArr.push(item.product.price *item.quantity)
        console.log(totalPriceArr)
      
  
 
     },
  

    )



    let v=0;
    let count =0;
    for(let i=0;i<totalPriceArr.length;i++)
    {
        count=parseInt(totalPriceArr[i])
        v +=count

    }
    console.log('total',v)


  
    const handleRemove = (arg) => {
        const itm_id=arg
        console.log('pId',itm_id)
        let api="http://localhost:8080/os/deleteCartItem/"+itm_id;
        fetch(api,
            {
                method:'DELETE',
                headers: {
                'Content-type': 'application/json'
                }
            }).then(res=>res.json());
            window.location.reload();
            
        };

        const orderNow=(t_amount)=>
        {
          
          const amount=t_amount
            
          
            const cartmodel=1

            
           
            const order =  {cartmodel,amount}
                console.log(order);
                fetch("http://localhost:8080/os/saveOrder/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(order)
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
            
            <article>
      {cartObj.map((item) => (
        <div className="cart_box1" key={item.id}>
          <div className="cart_img1">
          <img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946'/>
        

            <p>{item.product.name}</p>
          </div>
          <div>

            <button onClick={() => increaseQuantity(item,1)}>+</button>
            
            <span id='option_btn'>
                 <input name='cstm_inpt'  list='scripts' size={2} placeholder={item.quantity}  onChange={(e)=>{const selectedQntty=e.target.value; setQtyHm(selectedQntty);}} />
             
                <datalist id='scripts' >
                  
               
                < option value={1}  >1</option>
                < option value={2} > 2</option>
                < option value={3}  > 3</option>
                < option value={4} > 4</option>
                < option value={5} > 5</option>
                < option value={6} > 6</option>
                < option value={7} > 7</option>
                < option value={8} > 8</option>
                < option value={9} > 9</option>
               

                </datalist>
          
                    </span>
                    

                   
  
            
            <button onClick={() => decreaseQuantity(item, -1)}>-</button>
            <button onClick={()=>updateToCart(item.itemid,qtyHm,item.product.id)}>Update</button>
         
          </div>
          <div>
            <span>Rs - <span class="WebRupee" >&#x20B9;</span>{item.product.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            {/* <button onClick={() => handleRemove(item.product.id)}>Remove</button> */}
            <button onClick={() => handleRemove(item.itemid)}>Remove</button>
          </div>
          
        </div>
        
      ))}
      <div className="total1">
        <span>Total Price of your Cart</span>
        {/* <span>Rs -<span class="WebRupee">&#x20B9;</span> {item.product.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span> */}
        <span><span class="WebRupee" >&#x20B9;</span>{v.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </span>
       <br></br>
        <div id={'ordr_btn'}>
        <button onClick={() => orderNow(v)} ><h1><b>Order Now</b></h1></button>
          
        </div>
        
      </div>
    </article>
           


        
            

            
            <CrtFooter/>
        </div>
    )
}
export default Cart

{/* <span className='option_btn'>
<select onChange={(e)=>{const selectedQntty=e.target.value; setQtyHm(selectedQntty);}}>


< option value="1" >{item.quantity} </option>
< option value="1">1</option>
< option value="2" > 2</option>
< option value="3" > 3</option>
< option value="4" > 4</option>
< option value="5" > 5</option>
< option value="6" > 6</option>
< option value="7" > 7</option>
< option value="8" > 8</option>
< option value="9" > 9</option>

<option onClick={handleClick} >10+</option>

      
   </select>

   </span>
    */}