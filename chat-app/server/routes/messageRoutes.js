
const router = require("express").Router();
const { addMessage, getAllMessage } = require("../contrrollers/messageController");

router.post('/addMsg', addMessage);
router.post('/getMsg', getAllMessage);

module.exports = router;

