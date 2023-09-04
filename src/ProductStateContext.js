import {createContext, useContext, useEffect, useState} from 'react';
 import productListArr from "./data/data";
 import {toast} from 'react-toastify';

const productContext = createContext();

export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

const ProductContext = ({children})  =>{
    const [filterValue,setFilterValue] = useState("");
    const [cartArr,setCartArr] = useState([]);
    let [totalItemPrice,setTotalItemPrice] = useState(0);
    let [orderArr,setOrderArr] = useState([]);
    let [orderItemPrice,setOrderItemPrice] =useState(0);



   const addItemsToOrder = () => {
      orderArr = [...orderArr,...cartArr];
      setOrderArr(orderArr);
      setOrderItemPrice(totalItemPrice + orderItemPrice);
      setTotalItemPrice(0);
      setCartArr([]);
   }
   
   const removeItemFromCart = (e,id) => {
          let filteredArr = cartArr.filter((item) => item.id !== id);
          setCartArr([...filteredArr]);
          addTotalPrice(filteredArr);
    }

   const addTotalPrice = (arr) => {
      
        let ans = 0;
        arr.map((prod) => ans += prod.price);
        setTotalItemPrice(ans);
      
   }
    
    const cartProdItem = (item,id, op) => {
         
      let ind = cartArr.findIndex((prod) => prod.id === id);
           if(op === 'addition') {
             
                let prodInd = productListArr.findIndex((prod) => prod.id === id);
               
                cartArr[ind].cnt += 1;
                
                cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].cnt;
    
                setCartArr([...cartArr]);
             
            
           }
           else{
          
                if(cartArr[ind].cnt === 1) {
                  
                    let updateCartArr = cartArr.filter((prod) => prod.id !== id);
                    console.log(updateCartArr);
                    setCartArr(updateCartArr);
                }
                else if(cartArr[ind].cnt > 1) {
                    let prodInd = productListArr.findIndex((prod) => prod.id === id);
                     cartArr[ind].cnt -= 1;
                    cartArr[ind].price -= productListArr[prodInd].price;
                    setCartArr([...cartArr]);
                }
           }
          addTotalPrice(cartArr);
          
    }
   
    

    const addProdToCart = (e,item,id) => {
       e.preventDefault();
     
       e.target.innerText = 'Adding';
        setTimeout(() => {
            
            let ind = cartArr.findIndex((prod) => prod.id === id);
        
            let cnt = 0;
            
           if(ind >=0) {
          
               cartArr[ind].cnt += 1;
               cartArr[ind].price *= cartArr[ind].cnt;
               
           }
           else{
          
               cnt = 1;
               let cart = {id,cnt,...item};
                cartArr.push(cart);
                setCartArr(cartArr);
           }
          
          
           e.target.innerText = 'Add to Cart';
           addTotalPrice(cartArr);
        },500)
       
    }
    return (
       <productContext.Provider value = {{filterValue,setFilterValue,
        cartArr,setCartArr,addProdToCart,cartProdItem,setTotalItemPrice,
        totalItemPrice, addItemsToOrder, orderArr,orderItemPrice,removeItemFromCart
       }}>
         {children}
       </productContext.Provider>
    );
}


export default ProductContext;