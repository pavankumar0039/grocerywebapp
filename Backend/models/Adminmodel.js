const mongoose =require('mongoose');

const Adminschema=new mongoose.Schema({
    accounttype:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:[true,"Provide name"]
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    profilepic:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
},{
    timestamps:true

})
const AdminModel=mongoose.model('Admin',Adminschema);
module.exports=AdminModel