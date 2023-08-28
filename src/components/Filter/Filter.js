import styles from "./Filter.module.css";

const Filter = () => {
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
              id="mens-cloths"
              name="FilterProducts"
              value="mens-cloths"
            />
            <label for="mens-cloths">Men's Clothing</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id="womens-cloths"
              name="FilterProducts"
              value="womens-cloths"
            />
            <label for="womens-cloths">Women's Clothing</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id="jewelery"
              name="FilterProducts"
              value="jewelery"
            />
            <label for="jewelery">Jewelery</label>
          </div>
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              id="electronics"
              name="FilterProducts"
              value="electronics"
            />
            <label for="electronics">Electronics</label>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default Filter;
