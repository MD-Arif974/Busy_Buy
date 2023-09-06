import { useProductValue } from "../ProductStateContext";
import styles from "../components/Home/Home.module.css";
import {getDocs,collection} from 'firebase/firestore';
import {db} from '../firebaseInit';
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const { cartArr, cartProdItem, totalItemPrice, addItemsToOrder 
,removeItemFromCart,setCartArr,setTotalItemPrice,orderPurchased,setOrderPurchased
} =
    useProductValue();

     

    const getItems = async () => {
      const docId = sessionStorage.getItem("Auth Token");
      const querySnapshot = await getDocs(
        collection(db, "users", docId, "carts")
      );
      
      let currPrice = 0;
      querySnapshot.docs.map((doc) => {
        let data = doc.data();
       if(Object.keys(data).length >  0) {
          currPrice +=data.price;
          cartArr.push(data);
          setCartArr(cartArr);
       }
      
      });
      
      setTotalItemPrice(currPrice);
     
      
    };
    useEffect(() => {
      if(cartArr.length === 0) {
        getItems();
      }
      
    }, []);

   if(orderPurchased) {
       setOrderPurchased(false);
       return <Navigate to="/order" replace = {true} />
   }

  return (
    <>
      {cartArr.length > 0 ? (
        <>
          <div className={styles.cartProductPriceCont}>
            <h3>
              Total Price:- <span>&#8377;</span>
              {totalItemPrice}/-
            </h3>
            <button onClick={addItemsToOrder}>Purchase</button>
          </div>
          <div className={styles.productCont}>
            {cartArr.map((item, i) => (
              <div className={styles.cartProductDetails} key={i}>
                <div className={styles.cartProductImg}>
                  <img src={item.icon} alt={item.name} />
                </div>
                <div className={styles.productName}>{item.name}</div>
                <div className={styles.productPrice}>
                  <span>&#8377;</span>&nbsp;{item.price}
                  <div className={styles.prodCnt}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
                      alt="decrement btn"
                      onClick={() =>
                        cartProdItem(item, item.id, "decrement", item.price)
                      }
                    />
                    <span>{item.qty}</span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                      alt="increament btn"
                      onClick={() => cartProdItem(item, item.id, "addition")}
                    />
                  </div>
                </div>
                <div
                  className={styles.cartProductButton}
                  onClick={(e) => removeItemFromCart(e, item.id)}
                >
                  <button>Remove from Cart</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>Cart is Empty!!</h1>
      )}
    </>
  );
};

export default Cart;
