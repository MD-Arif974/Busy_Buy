import styles from './Home.module.css';
import productList from '../../data/data';
import Filter from '../Filter/Filter';
import { useValue } from '../../ProductStateContext';

const Home = () => {
    const {filterValue,setFilterValue} = useValue();

    return (
       <>
         <div className={styles.homeCont}>
            <div className={styles.searchCont}>
                <input type='text' placeholder='Search by Name...' value = {filterValue}
                  onChange={(e)=>setFilterValue(e.target.value)}
                />
            </div>
            <Filter />
            <div className={styles.productCont}>
               {
                 productList.filter((item) => {
                     if(!filterValue) return true;
                     if(item.name.includes(filterValue) === true) return true;
                 }).map((item, i) => (
                    <div className={styles.productDetails} key={i}>
                     <div className={styles.productImg}>
                        <img src={item.icon} alt={item.name}/>
                     </div>
                     <div className={styles.productName}>
                          {item.name}
                     </div>
                     <div className={styles.productPrice}>
                      <span>&#8377;</span>&nbsp;{item.price}
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