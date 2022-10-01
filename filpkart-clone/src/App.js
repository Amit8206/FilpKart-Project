import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CheckoutPage from "./containers/CheckoutPage";
import CartPage from './containers/CartPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate])
  
  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());

  }, [auth.authenticate]);


  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [auth.authenticate]);



  
  
  return (
    <div className="Container">
      <Routes>          
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/orders" element={<OrderPage />} />
          <Route path="/order_details/:orderId" element={<OrderDetailsPage />} />
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage />} />
          <Route path="/:slug" element={<ProductListPage />} />
      </Routes>
    </div>
  );
}

export default App;
