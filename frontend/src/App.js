

import Login from "./components/Login";
import {AuthProvider} from "./context/Authcontext"
import PrivateRoute from "./utils/PrivateRoute"
import Signup from "./components/Signup";
import Mainheader from "./components/Mainheader";
import Home from "./components/Home";
import Profile from "./components/Profile/profile";
import Productdetails from "./components/Productdetails";
import { Routes, Route } from "react-router-dom";
import Productsell from "./components/Productsell";
import Dashboard from "./components/Dashboard/Dashboard";
import BiddingDetails from "./components/Dashboard/BiddingDetails";
import OrdersPage from "./components/Dashboard/OrdersPage";
import SoldProducts from "./components/Dashboard/SoldProduct";
import Address from "./components/Profile/Address";
import Checkout from "./components/Checkout";
import PasswordResetForm from "./components/PasswordResetFrom";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Contact from "./components/Contact";
import VerifyOTP from "./components/VerifyOTP";
import VerifyAccount from "./components/VerifyAccount";
import ResendVerificationEmail from "./components/ResendVerificationEmail";
import EsewaPayment from "./components/EsewaPayment";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Mainheader />}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/otp-verify" element={<VerifyOTP/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/verify/:token" element={<VerifyAccount />} />
            <Route path="/resend-verification-email" element={<ResendVerificationEmail />} />
            <Route path="/product/:productParams" element={<Productdetails/>} >
              
            </Route>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/EsewaPayment" element={<EsewaPayment/>}/>
            <Route path="/profile" element={<Profile/>}>
              <Route path="addresses" element={<Address/>}/>
            </Route>
            <Route path="/product/upload" element={<Productsell/>}/>
          
            <Route path="/dashboard" element={<Dashboard/>}>
              <Route index element={<BiddingDetails/>}/>
              <Route path="orders/buying" element={<OrdersPage/>}/>
              <Route path="orders/selling" element={<SoldProducts/>}/>
            </Route>
            <Route path="/forgot-password" element={<ForgotPasswordForm/>}/> {/* Add route for forgot password */}
            <Route path="/reset-password/:uid/:token" element={<PasswordResetForm/>}/> {/* Add route for password reset */}
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/Home" element={<Home/>}/>
            
          </Route>
          
      
        </Routes>
      </AuthProvider>
    </>
    
    
  );
}
export default App;