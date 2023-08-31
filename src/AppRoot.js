import App from "./App";
import ProductContext from "./ProductStateContext";
import AuthenticationContext from "./AuthenticationConext";

const AppRoot = () => (
  
    <AuthenticationContext>
      <ProductContext>
      <App />
      </ProductContext>
    </AuthenticationContext>

);

export default AppRoot;