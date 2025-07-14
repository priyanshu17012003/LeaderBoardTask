const mongoose=require('mongoose');

const claimHistorySchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    userName:{
        type:String,
        required:true,
        trim:true
    },
    pointsAwarded:{
        type:Number,
        required:true
    },
    previousPoints:{
        type:Number,
        required:true
    },
    newPoints:{
        type:Number,
        required:true
    },
    claimedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const History=mongoose.model('History',claimHistorySchema);

module.exports=History;