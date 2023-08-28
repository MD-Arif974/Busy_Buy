import {createContext, useContext, useState} from 'react';

const productContext = createContext();

export const useValue = () => {
    const value = useContext(productContext);
    return value;
}

const ProductContext = ({children})  =>{
    const [filterValue,setFilterValue] = useState("");
    const [userIn,setUserIn] = useState(false);

    return (
       <productContext.Provider value = {{filterValue,setFilterValue,userIn,setUserIn}}>
         {children}
       </productContext.Provider>
    );
}


export default ProductContext;