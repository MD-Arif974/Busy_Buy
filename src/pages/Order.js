import { useProductValue } from "../ProductStateContext";
import styles from "./Orders.module.css";
import productList from "../data/data";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseInit";

const Order = () => {
  const { orderItemPrice, orderArr, setOrderArr, setOrderItemPrice } =
    useProductValue();

  const currDay = sessionStorage.getItem("date");
  const getItems = async () => {
    const docId = sessionStorage.getItem("Auth Token");

    const querySnapshot = await getDocs(
      collection(db, "users", docId, "orders", currDay, "orderlists")
    );

    let currPrice = 0;

    querySnapshot.docs.map((doc) => {
      let data = doc.data();
      data.id = doc.id;
      currPrice += data.totalPrice;
      orderArr.push(data);
    });

    setOrderArr([...orderArr]);
    setOrderItemPrice(currPrice);
  };
  useEffect(() => {
    if (orderArr.length === 0) {
      getItems();
    }
  }, []);

  return (
    <>
      <div className={styles.ordersCont}>
        {orderArr.length > 0 ? (
          <>
            <h1>Your Orders</h1>

            {
              <table>
                <caption>Ordered On:- {currDay}</caption>
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
                      <span>&#8377;</span> {orderItemPrice}
                    </th>
                  </tr>
                </tfoot>
              </table>
            }
          </>
        ) : (
          <h1>No Orders Found!!</h1>
        )}
      </div>
    </>
  );
};

export default Order;
