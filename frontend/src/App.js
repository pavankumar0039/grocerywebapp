//coremodules
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//userdefined modules

import Loginpage from './Screens/Loginpage/Loginpage';
import Signuppage from './Screens/Signuppage/Signuppage';
import AdminHomepage from './Screens/Homepage/AdminHomepage';
import Editprofile from './Screens/Editprofile';
import Groceryshop from './Screens/Groceryshop';
import { useState } from 'react';
import Basket from './Screens/Cart';
import Myorders from './Screens/Myorders';
import Successpage from './Screens/Successpage';



function App() {
   const [groceryproduct ,setgroceryproduct]=useState({});
    
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminHomepage setgroceryproduct={setgroceryproduct}/>}></Route>
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/Signup" element={<Signuppage />}></Route>
          <Route path="/editprofile" element={<Editprofile/>}></Route>
          <Route path="/groceryshop" element={<Groceryshop groceryproduct={groceryproduct}/>}></Route>
          <Route path="/cart" element={<Basket/>}></Route>
          <Route path="/myorders" element={<Myorders/>}></Route>
          <Route path="/success" element={<Successpage/>}></Route>
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
