import { db } from "./firebaseInit";
import Navbar from "./components/Navbar/Navbar";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./components/Home/Home";
import ProductContext from "./ProductStateContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {index: true,element: <Home />},
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
      ],
    },
  ]);
  return (
    <ProductContext>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ProductContext>
  );
}

export default App;
