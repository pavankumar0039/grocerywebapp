import React, { useState } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import AdminFooter from '../Components/Adminfooter'
import AdminUserRestaurant from '../Components/Admin_user_restaurant'
import Productaddingform from './../Components/Productaddingform'
import { useLocation } from 'react-router-dom'
const Groceryshop = (props) => {
    let [openproductform,setproductform]=useState(false);
   
    let [isproductpage,setisproductpage]=useState(true);
    let [productadded,setproductadded]=useState(false);
    const [searchvalue,setsearchvalue]=useState("")
    let location=useLocation();
    let {shop}=location.state
     console.log(shop);
    const addproduct=()=>{
      setproductform(true);  
    }

    



  return (
   <>
   <AdminNavbar  isproductpage={isproductpage} addproduct={addproduct} searchvalue={searchvalue} setsearchvalue={setsearchvalue} />
   {openproductform &&  <Productaddingform setproductform={setproductform} shop={shop} setproductadded={setproductadded} />}
   
   
   <AdminUserRestaurant setisproductpage={setisproductpage} shop={shop} productadded={productadded} setproductadded={setproductadded} searchvalue={searchvalue}/>
   <AdminFooter/>
  
   </>
  )
}

export default Groceryshop
