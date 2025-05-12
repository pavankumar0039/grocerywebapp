import React, { useState } from 'react'
import './AdminHomepage.css'
import AdminNavbar from '../../Components/AdminNavbar'
import AdminMain from '../../Components/AdminMain'
import AdminFooter from '../../Components/Adminfooter'

import Groceryaddingfrom from '../../Components/Groceryaddingfrom'

const AdminHomepage = (props) => {
  let [opengroceryform, setgroceryform] = useState(false)
  let [isgrocerypage,setisgrocerypage]=useState(true)
  let [groceryshopinsert,setgroceryshopinsert]=useState(false);
  const [searchvalue,setsearchvalue]=useState("")
  const addgrocery = () => {
    setgroceryform(true);
  }
  return (
    <div>
      <AdminNavbar setgroceryform={setgroceryform} addgrocery={addgrocery} isgrocerypage={isgrocerypage} setsearchvalue={setsearchvalue} searchvalue={searchvalue}/>
      {opengroceryform && <Groceryaddingfrom setgroceryform={setgroceryform} setgroceryshopinsert={setgroceryshopinsert}/>}
      <AdminMain setisgrocerypage={setisgrocerypage} groceryshopinsert={groceryshopinsert} setgroceryproduct={props.setgroceryproduct} searchvalue={searchvalue}/>
      <AdminFooter />


    </div>
  )
}

export default AdminHomepage
