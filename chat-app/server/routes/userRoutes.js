
const router = require("express").Router();
const { register , login, SetAvatar, getallUsers} = require("../contrrollers/userController");

router.post('/register', register);
router.post('/login', login);
router.post("/SetAvatar/:id", SetAvatar)
router.get("/allUsers/:id",getallUsers)
module.exports = router;

