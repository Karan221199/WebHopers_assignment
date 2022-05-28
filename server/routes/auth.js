const express = require('express');

const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        // cb(null, '../Images/')
        cb(null, path.join(__dirname, '../../client/src/components/assets/Images/'));
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
})

const Upload = multer({storage: storage})

// router.post('/signup',(req,res)=>{
    
//     const {name,email,password,mobile} = req.body;
//     if(!email || !password || !name || !mobile)
//     {
//         return res.status(422).json({error:"Please fill all the fields"})
//     }

//     User.findOne({email:email}).then((savedUser)=>{
//         if(savedUser){
//             return res.status(422).json({error:"User already exists with that email"})
//         }

//         bcrypt.hash(password,12).then(hashedpwd=>{
//             const user = new User({
//                 email,
//                 name,
//                 password : hashedpwd,
//                 mobile
//             })
//             user.save().then(user=>{
//                 res.json({message:"saved successfully"})
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         })
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

router.post('/signup',Upload.single('pic'),(req,res)=>{

    const {name,email,password,mobile} = req.body;
    if(!email || !password || !name || !mobile)
    {
        return res.status(422).json({error:"Please fill all the fields"})
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"})
        }

        bcrypt.hash(password,12).then(hashedpwd=>{
            const user = new User({
                email,
                name,
                password : hashedpwd,
                mobile,
                pic:req.file.originalname
            })
            user.save().then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(422).json({error:"Please fill all the fields"})
    }

    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid Email or Password"});
        }
        bcrypt.compare(password,savedUser.password).then(match=>{
            if(match)
            {
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email} = savedUser;
                res.json({token,user:{_id,name,email}});
            }
            else
            {
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})


router.get('/allUsers',requireLogin,(req,res)=>{
    User.find().then(users => {
        res.json({users})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router;