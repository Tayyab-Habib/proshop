import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from "./store"
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoutes from './components/PrivateRoutes';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListOrdersScreen from './screens/admin/ListOrdersScreen';
import AdminRoute from './components/AdminRoute'
import ProductsListScreen from './screens/admin/ProductsListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import ListUsersScreen from './screens/admin/ListUsersScreen';
import UpdateUserScreen from './screens/admin/UpdateUserScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/'element={<HomeScreen/>}/>
      <Route  path='/search/:keyword'element={<HomeScreen/>}/>
      <Route  path='/page/:pageNumber'element={<HomeScreen/>}/>
      <Route  path='search/:keyword/page/:pageNumber'element={<HomeScreen/>}/>
      <Route path="/products/:id" element={<ProductScreen/>}/>
      <Route path="/cart" element={<CartScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoutes />}>
      <Route path="/shipping" element={<ShippingScreen/>}/>
      <Route path="/payment" element={<PaymentScreen/>}/>
      <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
      <Route path="/order/:id" element={<OrderScreen/>}/>
      <Route path="/profile" element={<ProfileScreen/>}/>


      <Route path='' element={<AdminRoute/>}>
      <Route path="/admin/listorders" element={<ListOrdersScreen/>}/>
      <Route path="/admin/listproducts" element={<ProductsListScreen/>}/>
      <Route path="/admin/listproducts/:pageNumber" element={<ProductsListScreen/>}/>
      <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
      <Route path="/admin/listusers" element={<ListUsersScreen/>}/>
      <Route path="/admin/user/:id/edit" element={<UpdateUserScreen/>}/>

      </Route>
      

      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();
