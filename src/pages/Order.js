import { useProductValue } from "../ProductStateContext";
import styles from "./Orders.module.css";
import productList from "../data/data";

const Order = () => {
  const { cartArr, orderItemPrice,orderArr } = useProductValue();
  let d = new Date();
  let str = JSON.stringify(d);
  let currDate = str.substring(1, 11).split("-").reverse().join("-");

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
                  <td>{item.cnt}</td>
                  <td>
                    <span>&#8377;</span> {item.price}
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
