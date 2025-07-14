const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    totalPoints:{
        type:Number,
        default:0
    },
    rank:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);

module.exports=User;