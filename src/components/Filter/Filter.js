import { useProductValue } from "../../ProductStateContext";
import styles from "./Filter.module.css";


const Filter = () => {
  const { handleFilterProducts, checkedList,handleFilterRange,rangeValue
  } = useProductValue();

  
  return (
    <aside className={styles.filterCont}>
      <h2>Filter</h2>
      <form>
        <div className={styles.priceCont}>
          <div className={styles.filterPrice}>Price:{rangeValue}</div>
          <div className={styles.filterRangeCont}>
            <input type="range" id="price" step={0.5} 
              value={rangeValue}
              min="1"
              max="100000"
             
              onChange={(e) => handleFilterRange(e)}
            />
          </div>
        </div>
        <h2>Category</h2>
        {
          
        checkedList.map((list,id) => (
          <div className={styles.filterProductCont} key={list.id}>
          
         
            
              <div className={styles.filterItem} key={id}>
                <input
                  type="checkbox"
                  id={id}
                  value={list.name}
                  key={id}
                  defaultChecked = {list.check}
                  onClick={(e) => handleFilterProducts(e,list)}
                />
                <label htmlFor="category">{list.value}</label>
              </div>
            
          

          
        </div>

        ))

        
        
        }
      </form>
    </aside>
  );
};

export default Filter;
