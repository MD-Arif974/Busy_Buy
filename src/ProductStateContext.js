import { createContext, useContext,useState } from "react";
import productListArr from "./data/data";// list of product items stored in array in data file
import { checkBoxList } from "./data/data"; // list of checkboxes stored in array in data file
import { toast } from "react-toastify";
import { db } from "./firebaseInit";

// firebase methods
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";


// creating context
const productContext = createContext();


// creating custom hooks
export const useProductValue = () => {
  const value = useContext(productContext);
  return value;
};


// creating custom context
const ProductContext = ({ children }) => {
  const [filterValue, setFilterValue] = useState("");// value type in input field data is stored in this hook
  const [cartArr, setCartArr] = useState([]);// cart arr to store all products that is in the cart page
  let [totalItemPrice, setTotalItemPrice] = useState(0); // to store total item price of cart items
  let [orderArr, setOrderArr] = useState([]); // order arr to store product list that is in the order page
  let [orderItemPrice, setOrderItemPrice] = useState(0); // to store total price of each table in order page
  let [orderPurchased, setOrderPurchased] = useState(false);// to check wheather user purchased items or not
  let [checkedList, setCheckedList] = useState(checkBoxList);// to store checkboxes that is stored in data file
  const [categoryArr, setCategoryArr] = useState([]); // category arr to show those items who is matching with the clicked checkboxes
  const [rangeValue, setRangeValue] = useState(75000); // hook to store range value price
  let [filterRangeArr, setFilterRangeArr] = useState(productListArr); // filterRange arr to show product lists based on filtered price
  let [tempArr, setTempArr] = useState([]);// temp arr to store items temporary to store into category arr
  let [currDayArr,setCurrDayArr] = useState([]);
  let [priceArr,setPriceArr] = useState([]);
  let [loading,setLoading] = useState(false);
 
  // to get the current data
  let d = new Date();
  let str = JSON.stringify(d);
  let currDay = str.substring(1, 11).split("-").reverse().join("-");
  


  // handleFilterRange func to filtered out items based on price range
  const handleFilterRange = (e) => {
    setRangeValue(Math.floor(e.target.value));
    
    //fetching how many checkboxes have been clicked to filtered out data based on that
    let filteredCategoryArr = checkedList.filter((item) => item.check === true);

    if (filteredCategoryArr.length > 0) {
      setFilterRangeArr([]);
      setCategoryArr([]);
      
      //running loop on filteredCategoryArr and filtering items based on price and category
      for (let i = 0; i < filteredCategoryArr.length; i++) {
        let arr = productListArr.filter(
          (item) =>
            item.price <= e.target.value &&
            item.category === filteredCategoryArr[i].category
        );

        tempArr.push(...arr);
      }

      if (tempArr.length === 0) {
        setCategoryArr([]);
      } else {
        setCategoryArr([...tempArr]);
      }
      setTempArr([]);
    } else {
      let arr = productListArr.filter((item) => item.price <= e.target.value);
      setFilterRangeArr([...arr]);
    }
  };


  // handleFilterProducts func to filtered items based on clicked checkboxes
  const handleFilterProducts = (e, list) => {
    let ind = checkedList.findIndex((item) => item.id === list.id);

    checkedList[ind].check = !checkedList[ind].check;
    setCheckedList([...checkedList]);

    if (checkedList[ind].check === false) {
      let currArr = categoryArr.filter(
        (item) => item.category !== list.category
      );
      setCategoryArr([...currArr]);
    } else {
      let currArr = productListArr.filter(
        (item) => item.category === list.category && item.price <= rangeValue
      );
      setCategoryArr([...categoryArr, ...currArr]);
    }
  };
  

  // addItemsToOrder func to add all items into the order page
  const addItemsToOrder = async () => {
     console.log("line 110",orderArr);

    // getting email as id from session storage to store based on user
    const docId = sessionStorage.getItem("Auth Token");

    // creating document in firebase based on current data
    const orderDocRef = await setDoc(
      doc(db, "users", docId, "orders", currDay),
      {
        id: currDay,
      }
    );
   
    // mapping cart app products 
    cartArr.map(async (item) => {
      // prodInd is index of current item to get its actual price
      let prodInd = productListArr.findIndex((prod) => prod.id === item.id);
      
      console.log("order arr",orderArr);
      // indArr is to check whether product is present in order page or not 
      let indArr = orderArr.map((list) =>
        list.findIndex((orderItem) => orderItem.id === item.id)
      );
      
      
      // if val >= 0 means items is present, so we just have to update qty and price
      if (currDayArr[currDayArr.length-1] === currDay && indArr[indArr.length-1] >= 0) { 
       
        const docId = sessionStorage.getItem("Auth Token");
        const docRef = doc(
          db,
          "users",
          docId,
          "orders",
          currDay,
          "orderlists",
          item.id
        );
        await updateDoc(docRef, {
          qty: orderArr[orderArr.length -1][indArr[indArr.length -1]].qty + item.qty,
          totalPrice: orderArr[orderArr.length -1][indArr[indArr.length -1]].totalPrice + item.price,
        });
      } else {
        // if items is not present we are simply creating new document for product
        const docRef = await setDoc(
          doc(db, "users", docId, "orders", currDay, "orderlists", item.id),
          {
            name: item.name,
            qty: item.qty,
            price: productListArr[prodInd].price,
            totalPrice: item.price,
            icon: item.icon,
          }
        );
      }

     
    });
  
    //here we are getting all documents of carts collection
    const querySnapshot = await getDocs(
      collection(db, "users", docId, "carts")
    );
    
    // after getting all documents of carts collection i am just to delete the field not documents
    querySnapshot.docs.map(async (dbDoc) => {
      if (Object.keys(dbDoc.data()).length > 0) {
        const docRef = doc(db, "users", docId, "carts", dbDoc.data().id);
        await updateDoc(docRef, {
          name: deleteField(),
          qty: deleteField(),
          id: deleteField(),
          price: deleteField(),
          icon: deleteField(),
        });
      }
    });

    setOrderItemPrice(totalItemPrice + orderItemPrice);
    setTotalItemPrice(0);
    setCartArr([]);
    setOrderPurchased(true);
    
  };
 

  // removeItemFromCart func is to remove the items from cart arr when user clicked on remove button of a product list
  const removeItemFromCart = async (e, id) => {
    try {
      const docId = sessionStorage.getItem("Auth Token");
      let filteredArr = cartArr.filter((item) => item.id !== id);
      setCartArr([...filteredArr]);
      addTotalPrice(filteredArr);

      const docRef = doc(db, "users", docId, "carts", id);
      await deleteDoc(docRef);
    } catch (error) {
      toast.error(error.error);
    }
  };
 
  // addTotalPrice func is to add total price of cart arr
  const addTotalPrice = (arr) => {
    let ans = 0;
    arr.map((prod) => (ans += prod.price));
    setTotalItemPrice(ans);
  };
  
  // updateDocDB func is to update the values based on id on firebase
  const updateDocDB = async (ind, id) => {
    try {
      const docId = sessionStorage.getItem("Auth Token");
      const docRef = doc(db, "users", docId, "carts", id);
      await updateDoc(docRef, {
        qty: cartArr[ind].qty,
        price: cartArr[ind].price,
      });
    } catch (error) {
      toast.error(error.error);
    }
  };
  
  //cartProdItem func is to increment or decrement qty and price based on user clicked button
  const cartProdItem = async (item, id, op) => {
    try {
      const docId = sessionStorage.getItem("Auth Token");
      let ind = cartArr.findIndex((prod) => prod.id === id);
      if (op === "addition") {
        let prodInd = productListArr.findIndex((prod) => prod.id === id);

        cartArr[ind].qty += 1;

        cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].qty;

        updateDocDB(ind, id);
        addTotalPrice(cartArr);
      } else {
        if (cartArr[ind].qty === 1) {
          let updateCartArr = cartArr.filter((prod) => prod.id !== id);
          setCartArr([...updateCartArr]);
          addTotalPrice(updateCartArr);
          const docRef = doc(db, "users", docId, "carts", id);
          await deleteDoc(docRef);
        } else if (cartArr[ind].qty > 1) {
          let prodInd = productListArr.findIndex((prod) => prod.id === id);
          cartArr[ind].qty -= 1;
          cartArr[ind].price -= productListArr[prodInd].price;
          setCartArr([...cartArr]);

          updateDocDB(ind, id);
          addTotalPrice(cartArr);
        }
      }
    } catch (error) {
      toast.error("Something went Wrong!");
    }
  };

  // addProdToCart func is to add product into cart arr when user clicked on add button from home page
  const addProdToCart = (e, item, id) => {
    e.preventDefault();

    e.target.innerText = "Adding";
    setTimeout(async () => {
      try {
        let ind = cartArr.findIndex((prod) => prod.id === id);

        let qty = 1;

        if (ind >= 0) {
          let prodInd = productListArr.findIndex((prod) => prod.id === id);
          cartArr[ind].qty += 1;
          cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].qty;
          updateDocDB(ind, id);
          toast.success("Product Incremented Successfully");
        } else {
          const docId = sessionStorage.getItem("Auth Token");
          const docRef = await setDoc(
            doc(db, "users", docId, "carts", item.id),
            {
              name: item.name,
              qty,
              price: item.price,
              icon: item.icon,
              id: item.id,
            }
          );

          let cart = { id, qty, ...item };
          cartArr.push(cart);
          setCartArr([...cartArr]);
          toast.success("Product Added Successfully");
        }

        e.target.innerText = "Add to Cart";
        addTotalPrice(cartArr);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }, 300);
  };
  return (
    <productContext.Provider
      value={{
        filterValue,
        setFilterValue,
        cartArr,
        setCartArr,
        addProdToCart,
        cartProdItem,
        setTotalItemPrice,
        totalItemPrice,
        addItemsToOrder,
        orderArr,
        orderItemPrice,
        removeItemFromCart,
        setOrderArr,
        setOrderItemPrice,
        handleFilterProducts,
        orderPurchased,
        setOrderPurchased,
        checkedList,
        categoryArr,
        handleFilterRange,
        rangeValue,
        filterRangeArr,
        currDayArr,
        setCurrDayArr,
        priceArr,
        setPriceArr,
        loading,
        setLoading
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContext;
