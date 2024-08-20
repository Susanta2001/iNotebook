const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')


// Creating a secret for sending and verifying webtokens from users
const JWT_SECRET = 'Harryisagoodb$oy';

// route -1 : No login required. Post data at http://localhost:3000/api/auth/createuser
router.post('/createuser',[
  body("name","Enter a valid name").isLength({min : 3}),
  body("email", "Enter a valid email").isEmail(),
  body("password").isLength({min : 5}),  
], async (req, res) => {

    let success = false;
    // if there are errors return bad requst and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors:errors.array() });
    }

    // check wheather the email exists already

    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt);

    // Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
    })

    // res.json(user)
    // signing the user data for future verification
    const data = {
        user:{ 
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({success, authToken});
}
    catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    //     res.json({error: "Please enter a unqique id for email", message: err.message})})
})


// ROUTE - 2:  No login required. Post data at http://localhost:3000/api/auth/login
router.post('/login',[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists()  
  ], async (req, res) => {
    let success = false;

    // if there are errors return bad request and erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors:errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, errors : "Please use correct credentials to login"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please use correct credentials to login"});
        }

        const data ={
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }
)

// route -3 : Login required. Get logged in users details http://localhost:3000/api/auth/getuser

router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        success = true;
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  })
module.exports = router;