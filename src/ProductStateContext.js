import { createContext, useContext, useEffect, useState } from "react";
import productListArr from "./data/data";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField
} from "firebase/firestore";
import { db } from "./firebaseInit";


const productContext = createContext();

export const useProductValue = () => {
  const value = useContext(productContext);
  return value;
};

const ProductContext = ({ children }) => {
  const [filterValue, setFilterValue] = useState("");
  const [cartArr, setCartArr] = useState([]);
  let [totalItemPrice, setTotalItemPrice] = useState(0);
  let [orderArr, setOrderArr] = useState([]);
  let [orderItemPrice, setOrderItemPrice] = useState(0);
  let [orderPurchased, setOrderPurchased] = useState(false);
 
  let d = new Date();
  let str = JSON.stringify(d);
  let currDay = str.substring(1, 11).split("-").reverse().join("-");
  
  sessionStorage.setItem("date",currDay);
  
   const handleFilterProducts = (e) => {
       e.preventDefault();
       
   }

  

  const addItemsToOrder = async() => {
   
    

    const docId = sessionStorage.getItem("Auth Token");
    const orderDocRef = await setDoc(doc(db, "users", docId, "orders", currDay), {});
    
    console.log("carts",cartArr,"....","order",orderArr);
    cartArr.map(async(item) => {
        let prodInd = productListArr.findIndex((prod) => prod.id === item.id);

        let ind = orderArr.findIndex((orderItem) => orderItem.id === item.id);
         console.log(ind);
        if(ind >= 0) {
          const docId = sessionStorage.getItem("Auth Token");
          const docRef = doc(db, "users", docId, "orders",currDay,"orderlists", item.id);
          await updateDoc(docRef, {
            qty: orderArr[ind].qty + item.qty,
            totalPrice: orderArr[ind].totalPrice + item.price,
          });
        }
        else{
          const docRef = await setDoc(doc(db, "users", docId, "orders",currDay,"orderlists", item.id), {
            name: item.name,
            qty:item.qty,
            price:productListArr[prodInd].price,
            totalPrice: item.price,
            icon: item.icon,
          });
        }
       
        
        
        setOrderItemPrice(totalItemPrice + orderItemPrice);
        setTotalItemPrice(0);
        setCartArr([]);
       
    })
  
    

   


    const querySnapshot = await getDocs(
      collection(db, "users", docId, "carts")
    );
    
   
    querySnapshot.docs.map(async(dbDoc) => {
        if(Object.keys(dbDoc.data()).length > 0) {
            const docRef = doc(db, "users", docId, "carts", dbDoc.data().id);
            await updateDoc(docRef, {
                name: deleteField(),
                qty:deleteField(),
                id:deleteField(),
                price:deleteField(),
                icon:deleteField()
            });
        }
       
        
       
      });
      setOrderPurchased(true);
      setOrderArr([]);

  };

  const removeItemFromCart = async(e, id) => {
   try{
    const docId = sessionStorage.getItem("Auth Token");
    let filteredArr = cartArr.filter((item) => item.id !== id);
    setCartArr([...filteredArr]);
    addTotalPrice(filteredArr);

    const docRef = doc(db, "users", docId, "carts", id);
    await deleteDoc(docRef);
   }
   catch(error) {
    toast.error(error.error);
   }

  };

  const addTotalPrice = (arr) => {
  
    let ans = 0;
    arr.map((prod) => (ans += prod.price));
    setTotalItemPrice(ans);
  };

  const updateDocDB = async(ind,id) => {
    try{
      const docId = sessionStorage.getItem("Auth Token");
      const docRef = doc(db, "users", docId, "carts", id);
      await updateDoc(docRef, {
        qty: cartArr[ind].qty,
        price: cartArr[ind].price,
      });
    }
    catch(error) {
      toast.error(error.error);
    }
  }

  const cartProdItem = async (item, id, op) => {
        try{
          const docId = sessionStorage.getItem("Auth Token");
    let ind = cartArr.findIndex((prod) => prod.id === id);
    if (op === "addition") {
      let prodInd = productListArr.findIndex((prod) => prod.id === id);
    
      cartArr[ind].qty += 1;

      cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].qty;

       updateDocDB(ind,id);
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

        updateDocDB(ind,id);
        addTotalPrice(cartArr);
      }
    }
        }catch(error) {
           toast.error("Something went Wrong!");
        }
   
  };

  const addProdToCart = (e, item, id) => {
    e.preventDefault();

   
    e.target.innerText = "Adding";
    setTimeout(async () => {
      try{
        let ind = cartArr.findIndex((prod) => prod.id === id);

        let qty = 1;
  
       
        if (ind >= 0) {
          let prodInd = productListArr.findIndex((prod) => prod.id === id);
          cartArr[ind].qty += 1;
          cartArr[ind].price = productListArr[prodInd].price * cartArr[ind].qty;
          updateDocDB(ind,id);
          toast.success("Product Incremented Successfully");
        } else {
          const docId = sessionStorage.getItem("Auth Token");
          const docRef = await setDoc(doc(db, "users", docId, "carts", item.id), {
            name: item.name,
            qty,
            price: item.price,
            icon: item.icon,
            id:item.id
          });
  
          let cart = { id, qty, ...item };
          cartArr.push(cart);
          setCartArr([...cartArr]);
          toast.success("Product Added Successfully");
        }
  
        e.target.innerText = "Add to Cart";
        addTotalPrice(cartArr);
      }
      catch(error) {
        toast.error("Something went wrong!");
      }
      
    }, 500);
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
        setOrderPurchased
        
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContext;
