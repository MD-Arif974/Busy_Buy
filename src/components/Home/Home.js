import styles from "./Home.module.css";
import productList from "../../data/data";
import Filter from "../Filter/Filter";
import { useAuthValue } from "../../AuthenticationConext";
import { useProductValue } from "../../ProductStateContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const Home = () => {
  const { filterValue, setFilterValue, addProdToCart, cartArr ,totalItemPrice} =
    useProductValue();
    const {loggedIn,setLoggedIn,setUserName} = useAuthValue();

    const navigate = useNavigate();
     
   
    useEffect(() => {
     
      const auth = sessionStorage.getItem('Auth Token');
   
      if(auth) {
        let name = localStorage.getItem(auth);
        setUserName(name);
         setLoggedIn(true);
      }
      else{
         setLoggedIn(false);
      }
  },[])

  return (
    <>
      <div className={styles.homeCont}>
        <div className={styles.searchCont}>
          <input
            type="text"
            placeholder="Search by Name..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <Filter />
        <div className={styles.productCont}>
          {productList
            .filter((item) => {
              if (!filterValue) return true;
              if (item.name.includes(filterValue) === true) return true;
            })
            .map((item, i) => (
              <div className={styles.productDetails} key={i}>
                <div className={styles.productImg}>
                  <img src={item.icon} alt={item.name} />
                </div>
                <div className={styles.productName}>{item.name}</div>
                <div className={styles.productPrice}>
                  <span>&#8377;</span>&nbsp;{item.price}
                 
                </div>
                {loggedIn ? 
                   <div
                   className={styles.productButton}
                   onClick={(e) => addProdToCart(e, item, i)}
                 >
               
                  <button>Add to Cart</button>
                 </div>
                 
                 :
                 <div
                 className={styles.productButton}
                 onClick={(e) => navigate('/signin')}
               >
                 <button>Add to Cart</button>
               </div>
              }
               
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
