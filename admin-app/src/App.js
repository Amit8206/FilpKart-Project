import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './containers/Home'
import { Signin } from './containers/SignIn'
import { Signup } from './containers/SignUp'
import { useEffect } from 'react';
import { isUserLoggedIn, getAllCategory, getInitialData } from './actions'
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './components/HOC/PrivateRoute'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';




function App() {

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);


  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute />} >
          <Route exact path="/" element={<Home />} />
          <Route path="/page" element={< NewPage />} />
          <Route path="/category" element={< Category />} />
          <Route path="/products" element={< Products />} />
          <Route path="/orders" element={< Orders />} />
        </Route>
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;
