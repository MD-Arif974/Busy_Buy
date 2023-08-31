import { db } from "./firebaseInit";
import Navbar from "./components/Navbar/Navbar";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./components/Home/Home";
import NotFound from "./pages/NotFound";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,


} from "react-router-dom";
import { useAuthValue } from "./AuthenticationConext";


function App() {
  const { loggedIn , signUpSuccess} = useAuthValue();
    
   
 
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<NotFound />,
      element: <Navbar />,
     
      children: [
        { index: true, element: <Home />},
        {
          path: "order",
          element: loggedIn ?  <Order /> : <SignIn />,
        },
        {
          path: "cart",
          element: loggedIn ?  <Cart /> : <SignIn />,
        },
        {
          path: "signup",
          element:signUpSuccess ?  <Navigate to="/signin" replace={true} /> : <SignUp />,
        },
        {
          path: "signin",
          element:  <SignIn />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
