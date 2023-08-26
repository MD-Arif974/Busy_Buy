import styles from './Home.module.css';
import productList from '../../data/data';

const Home = () => {
    

    return (
       <>
         <div className={styles.homeCont}>
            <div className={styles.searchCont}>
                <input type='text' placeholder='Search by Name...' />
            </div>
            <div className={styles.filterCont}></div>
            <div className={styles.productCont}>
               {
                 productList.map((item, i) => (
                    <div className={styles.productDetails} key={i}>
                     <div className={styles.productImg}>
                        <img src={item.icon} alt={item.name}/>
                     </div>
                     <div className={styles.productName}>
                          {item.name}
                     </div>
                     <div className={styles.productPrice}>
                            {item.price}
                     </div>
                     <div className={styles.productButton}>
                        <button>Add to Cart</button>
                     </div>
                </div>
                ))
               }
                
            </div>
         </div>
       </>
    );
}


export default Home;