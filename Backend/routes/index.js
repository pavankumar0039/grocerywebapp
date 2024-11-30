const express=require('express')
const router=express.Router()

//user modules import
const usercreation=require('../Controllers/UserControler/Usercreation')
const admincreation=require('../Controllers/AdminControler/Admincreation')
const adminlogin=require('../Controllers/AdminControler/Adminlogin')
const userlogin=require('../Controllers/UserControler/Userlogin')
const mastergrocerycreation=require('../Controllers/Mastergocery/Mastergrocerycreation')
const mastergrocerygetting=require('../Controllers/Mastergocery/Mastergrocerygetting')
const admingroceryshopcreation=require('../Controllers/AdminControler/Admingrocerycreation');
const admingroceryshopdeletion=require('../Controllers/AdminControler/Admingrocerydeletion')
const mastergrocerydeletion=require('../Controllers/Mastergocery/Mastergrocerydeletion')
const editadmingroceryshop=require('../Controllers/AdminControler/Admingroceryedit')
const editmastergroceryshop=require('../Controllers/Mastergocery/Mastergroceryedit')
const productinsertion=require('../Controllers/AdminControler/Admingroceryproductsinsertion')
const admingrocerygetting=require('../Controllers/AdminControler/Admingrocerygetting')
const admingettingproducts=require('../Controllers/AdminControler/Admingettingproducts')
const adminremovingproducts=require('../Controllers/AdminControler/Adminremovingproducts')
const adminupdatingproducts=require('../Controllers/AdminControler/Adminupdatingproducts')
const addtocart=require('../Controllers/UserControler/Addtocart')
const gettingcartdetails=require('../Controllers/UserControler/Usercartdetails')
const checkout=require('../Controllers/UserControler/Checkout')
const gettingorderdetails=require('../Controllers/UserControler/Getorderdetails')
const logout=require('../Controllers/logout')
const adminupdate=require('../Controllers/AdminControler/Admineditprofile')
const userupdate=require('../Controllers/UserControler/Usereditprofile')
const authentication=require('../Controllers/Authentication')
const checkoutsession=require('../Controllers/UserControler/Checkoutsession')
//User Routes
router.post('/usercreation',usercreation);
router.post('/userlogin',userlogin);
router.post('/addtocart',addtocart)
router.post('/gettingcartdetails',gettingcartdetails)
router.post('/checkoutsession',checkoutsession)
router.post('/checkout',checkout)
router.post('/gettingorderdetails',gettingorderdetails)
router.post('/userupdate',userupdate)
router.post('/logout',logout)

//Admin routes
router.post('/adminlogin',adminlogin);
router.post('/admincreation',admincreation);
router.post('/admingroceryshopcreation',admingroceryshopcreation);
router.post('/admingroceryshopdeletion',admingroceryshopdeletion);
router.post('/admingrocerygetting',admingrocerygetting);
router.post('/admingettingproducts',admingettingproducts)
router.post('/adminremovingproducts',adminremovingproducts)
router.post('/insertproduct',productinsertion)
router.post('/adminupdate',adminupdate)
router.post('/adminupdatingproducts',adminupdatingproducts);
router.post('/editadmingroceryshop',editadmingroceryshop);

//master routes
router.post('/mastergrocerydeletion',mastergrocerydeletion); 
router.post('/editmastergroceryshop',editmastergroceryshop);
router.post('/mastergrocerycreation',mastergrocerycreation);
router.get('/mastergrocerygetting',mastergrocerygetting);


module.exports=router