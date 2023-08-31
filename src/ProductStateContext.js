import {createContext, useContext, useState} from 'react';
 import productListArr from "./data/data";

const productContext = createContext();

export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

const ProductContext = ({children})  =>{
    const [filterValue,setFilterValue] = useState("");
    const [cartArr,setCartArr] = useState([]);
   
   
    
    const cartProdItem = (item,id, op) => {
         
      let ind = cartArr.findIndex((prod) => prod.id === id);
           if(op === 'addition') {
             
                let prodInd = productListArr.findIndex((prod) => prod.id === id);
               
                cartArr[ind].cnt += 1;
                
                cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].cnt;
    
                setCartArr([...cartArr]);
             
            
           }
           else{
            console.log( "line 33", cartArr[ind].cnt);
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
          
         
    }
   
    

    const addProdToCart = (e,item,id) => {
        e.preventDefault();
        let ind = cartArr.findIndex((prod) => prod.id === id);
        console.log(ind,"line 55");
         let cnt = 0;
        if(ind === id) {
            cartArr[ind].cnt += 1;
            cartArr[ind].price *= cartArr[ind].cnt;
        }
        else{
            cnt = 1;
            setCartArr([...cartArr,{id,cnt,...item}]);
        }

       
        
    }
    return (
       <productContext.Provider value = {{filterValue,setFilterValue,
        cartArr,setCartArr,addProdToCart,cartProdItem
       }}>
         {children}
       </productContext.Provider>
    );
}


export default ProductContext;