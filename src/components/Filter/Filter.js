import { useProductValue } from "../../ProductStateContext";
import styles from "./Filter.module.css";

const Filter = () => {
  const {handleFilterProducts} = useProductValue();
  return (
    <aside className={styles.filterCont}>
      <h2>Filter</h2>
      <form>
        <div className={styles.priceCont}>
          <div className={styles.filterPrice}>Price:1200</div>
          <div className={styles.filterRangeCont}>
            <input type="range" id="price" step={10} />
          </div>
        </div>
        <div className={styles.filterProductCont}>
            <h2>Category</h2>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id="mens-cloth"
              name="FilterProducts"
              value="mens-cloth"
              onClick={(e) => handleFilterProducts(e)}
            />
            <label for="mens-cloths">Men's Clothing</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id="womens-cloth"
              name="FilterProducts"
              value="womens-cloth"
              onClick={(e) => handleFilterProducts(e)}
            />
            <label for="womens-cloths">Women's Clothing</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id='jewellery'
              name="FilterProducts"
              value='jewellery'
              onClick={(e) => handleFilterProducts(e)}
            />
            <label for="jewelery">Jewelery</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id='electronics'
              name="FilterProducts"
              value='electronics'
              onClick={(e) => handleFilterProducts(e)}
            />
            <label for="electronics">Electronics</label>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default Filter;
