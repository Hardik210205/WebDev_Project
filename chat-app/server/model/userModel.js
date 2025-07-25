const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    username :{
        type: String,
        required :true,
        min: 3,
        max : 20,
        unique : true,
    },
    email :{
        type: String,
        required :true,
        max : 30,

    },
    password: {
        type: String,
        required :true,
        min:8,
       // select : false,
    },
    isAvtarImageSet:{
        type: Boolean,
        default: false,
    },
    
    AvtarImage:{
       type:String,
       default:"",

    },
})

module.exports = mongoose.model("User",userSchema);