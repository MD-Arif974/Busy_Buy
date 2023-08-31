import { useProductValue } from '../ProductStateContext';
import styles from '../components/Home/Home.module.css';
const Cart = () => {
   const {cartArr,cartProdItem} = useProductValue();
   
    return (
        <>
           <div className={styles.productCont}>
               {
                 cartArr.map((item, i) => (
                    <div className={styles.productDetails} key={i}>
                     <div className={styles.productImg}>
                        <img src={item.icon} alt={item.name}/>
                     </div>
                     <div className={styles.productName}>
                          {item.name}
                     </div>
                     <div className={styles.productPrice}>
                      <span>&#8377;</span>&nbsp;{item.price}
                      <div className={styles.prodCnt}>
                   
                     <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
                      alt="decrement btn"
                      onClick={() => cartProdItem(item,item.id,"decrement",item.price)}

                    />
                    <span>{item.cnt}</span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                      alt="increament btn"
                      onClick={() => cartProdItem(item,item.id,"addition")}
                    />
                   
                  </div>
                     </div>
                     <div className={styles.productButton}>
                        <button>Remove from Cart</button>
                     </div>
                </div>
                ))
               }
                
            </div>
        </>
    )
}

export default Cart;