import { BrowserRouter, Switch, Route } from "react-router-dom";

//context
import { UserProvider } from "commom/context/user";
import { CartProvider } from "commom/context/cart";
import { PaymentProvider } from "commom/context/payment";

//pages
import Feira from "pages/Feira";
import Login from "pages/Login";
import Carrinho from "pages/Carrinho";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <CartProvider>
            <PaymentProvider>
              <Route path="/feira">
                <Feira />
              </Route>
              <Route path="/carrinho">
                <Carrinho />
              </Route>
            </PaymentProvider>
          </CartProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  )
};