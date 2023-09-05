import { useProductValue } from "../ProductStateContext";
import styles from "./Orders.module.css";
import productList from "../data/data";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  
} from "firebase/firestore";
import { db } from "../firebaseInit";

const Order = () => {
  const {orderItemPrice,orderArr,setOrderArr,setOrderItemPrice } = useProductValue();
  let d = new Date();
  let str = JSON.stringify(d);
  let currDate = str.substring(1, 11).split("-").reverse().join("-");

  const getItems = async () => {
    const docId = sessionStorage.getItem("Auth Token");
    const querySnapshot = await getDocs(
      collection(db, "users", docId, "orders")
    );
    
   let currPrice = 0;
    querySnapshot.docs.map((doc) => {
      let data = doc.data();
      data.id = doc.id;
      currPrice += data.price;
     orderArr.push(data);
     setOrderArr(orderArr);
    });

    setOrderItemPrice(currPrice);
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className={styles.ordersCont}>
       {
        orderArr.length > 0 ? 
          <>
            <h1>Your Orders</h1>
        {
          <table>
            <caption>Ordered On:- {currDate}</caption>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderArr.map((item, i) => (
                <tr key={i}>
                  <td
                    
                  >
                    {item.name}
                  </td>
                  <td>
                    <span>&#8377;</span> {productList[item.id].price}
                  </td>
                  <td>{item.qty}</td>
                  <td>
                    <span>&#8377;</span> {item.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <th>
                  <span>&#8377;</span> {orderItemPrice}
                </th>
              </tr>
            </tfoot>
          </table>
        }
          </>
        : <h1>No Orders Found!!</h1>
       }

        
      </div>
    </>
  );
};

export default Order;
