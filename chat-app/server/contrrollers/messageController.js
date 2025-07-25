const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {

    try{
        const {from,to,message}= req.body;
        const data = await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender : from,
        });
        if(data)return res.json({msg: "message success"});
        return res.json({msg: "message failed"});
    }
    catch(ex){
        next(ex);
    }

};
module.exports.getAllMessage = async (req, res, next) => {
try{
    const {from,to  }= req.body;

    
    const message = await messageModel.find(
        {users : {
            $all : [from,to] ,
},}).sort({updatedAt:1})
const projectMessage = message.map((msg)=>{
    return {
        fromSelf: msg.sender.toString() === from.toString(), // ✅ Correct property name
        message: msg.message.text,
      };

});
res.json(projectMessage)
}
catch(ex){
    next(ex);
}


};

    