const mongoose =require('mongoose');

const Userschema=new mongoose.Schema({
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
        required:false
    }
},{
    timestamps:true

})
const UserModel=mongoose.model('User',Userschema);
module.exports=UserModel