const Users = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check for existing user
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.json({
                    msg: "Username already used",
                    status: false
                });
            } else {
                return res.json({
                    msg: "Email already has an account",
                    status: false
                });
            }
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username,
            password: hashedPassword,
        });

        // Remove password from response
        user.password = undefined;
        return res.json({ status: true, user });

    } catch (ex) {
        console.error("Registration error:", ex);
        return res.status(500).json({
            msg: "Internal server error during registration",
            status: false
        });
    }
};




module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // 1. Check if user exists
        const user = await Users.findOne({ username }); // Changed variable name
        if (!user) {
            return res.status(401).json({
                msg: "Incorrect Username or password",
                status: false
            });
        }

        // 2. Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password); // Fixed variable name
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Incorrect Username or password",
                status: false
            });
        }
        
        // 3. Successful login
        user.password = undefined;
        return res.json({ status: true, user });
        
    } catch (ex) {
        console.error("Login error:", ex); // Corrected error message
        return res.status(500).json({ // Fixed status code
            msg: "Internal server error during login",
            status: false
        });
    }
};
module.exports.SetAvatar = async (req, res, next) => {
    try {
      const userID = req.params.id; // Use req.params.id instead of req.param.id
      const avatar = req.body.image;
  
      // Update the user with the new avatar data
      const userData = await Users.findByIdAndUpdate(
        userID,
        {
          isAvtarImageSet: true,
          AvtarImage: avatar,
        },
        { new: true } // Return the updated document
      );
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json({
        isSet: userData.isAvtarImageSet,
        image: userData.AvtarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };


module.exports.getallUsers = async (req, res, next) => {


try{
    const users = await Users.find({
         _id: { $ne: req.params.id }  }).select([
            "email","username","AvtarImage",
            "_id"
        ])
   
   return res.json(users)
        }
catch(ex){
    next(ex);
}
    
}
