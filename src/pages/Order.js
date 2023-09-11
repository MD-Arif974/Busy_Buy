import { useProductValue } from "../ProductStateContext";
import styles from "./Orders.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useAuthValue } from "../AuthenticationConext";

const Order = () => {
  const {
    orderArr,
    setOrderArr,
    orderPurchased,
    setOrderPurchased,
    setCurrDayArr,
    currDayArr,
    setPriceArr,
    priceArr,
  } = useProductValue();
  const { setUserName } = useAuthValue();



  const getItems = async () => {
    const docId = sessionStorage.getItem("Auth Token");
    const name = localStorage.getItem(docId);

    const querySnapshot = await getDocs(
      collection(db, "users", docId, "orders")
    );

    let arr = [];
    querySnapshot.docs.map(async (doc) => {
      let data = doc.data().id;
      let currPrice = 0;
      const querySnapshotInside = await getDocs(
        collection(db, "users", docId, "orders", data, "orderlists")
      );
      querySnapshotInside.docs.map((insideDoc) => {
        let newData = insideDoc.data();
        newData.id = insideDoc.id;
        currPrice += newData.totalPrice;
        arr.push(newData);
      });

      if(arr.length > 0) {
        currDayArr.push(data);
        priceArr.push(currPrice);
        orderArr.push([...arr]);
        setPriceArr(priceArr);
      setCurrDayArr(currDayArr);
      setOrderArr([...orderArr]);
      }
     

      arr = [];

      
      setUserName(name);
      setOrderPurchased(false);
    });
     
  };
  useEffect(() => {
   
   
  
    if ( orderArr.length >= 0) {
     
      
      let len = orderArr.length;
      for (let i = 0; i < len; i++) {
       orderArr.splice(0,1);
       currDayArr.splice(0,1);
       priceArr.splice(0,1);
       
      }
     

      getItems();
    }

    
  }, []);

  return (
    <>
      <div className={styles.ordersCont}>
        
        {orderArr.length > 0 ? (
          <>
            <h1>Your Orders</h1>

            {orderArr.map((list, ind) => {
              
              return (
                <table key={ind}>
                  <caption>Ordered On:- {currDayArr[ind]}</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>
                          <span>&#8377;</span> {item.price}
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
                        <span>&#8377;</span> {priceArr[ind]}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              );
            })}
          </>
        ) : (
          <h1>No Orders Found!!</h1>
        )}
      </div>
    </>
  );
};

export default Order;
