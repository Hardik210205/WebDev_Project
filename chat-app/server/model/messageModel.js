const mongoose = require("mongoose");
const { applyTimestamps } = require("../model/userModel");

const messageSchema =  new mongoose.Schema(
    {
  message:{
    text:{
        type: String,
        required: true,
        min:1,
        max:2000
    },
},
    users : Array,
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    },
  { timestamps:true  }
    
);

module.exports = mongoose.model("Messages",messageSchema);