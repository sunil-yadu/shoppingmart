import React, { useEffect ,useState} from "react"
import { useNavigate } from "react-router-dom"
import './style/navbar.css'
const Header =() =>
{

    const [cartObj, setCartObj ]= useState([]);
    const crt_id=1
   
    useEffect(() => {
        let api="http://localhost:8080/os/ShowAllCartItemProducts/"+crt_id;
        
       
            
      fetch(api)
          .then(res => res.json())
          .then((result) => {
              setCartObj(result);
          }
          )
    }, [])
    console.log(cartObj.length)

    const navigate=useNavigate();
    return(
     
           <nav>
           <div className="nav_box">
             <span className="my_shop" onClick={() => {
            navigate("/");
          }}>
               ShoppingMart
             </span>
             <div className="cart">
               <span >
                 <i className="fas fa-cart-plus" onClick={() => {
            navigate("/cart");
          }}></i>
               </span>
               <span >{cartObj.length}</span>
             </div>
           </div>
         </nav>
    )
}
export default Header