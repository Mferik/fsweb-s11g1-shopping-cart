import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart([...cart, { ...item, id: Date.now() }]);
  };

  const removeItem = (id) => {
    const newCartState = cart.filter((item) => id !== item.id);
    setCart(newCartState);
  };

  return (
    <CartContext.Provider value={{ cart, removeItem }}>
      <ProductContext.Provider value={{ products, addItem }}>
        <div className="App">
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </ProductContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
