const { generatePasswordHash, validatePW, generateUserToken } = require('../middleware/auth')

const User = require('../models/Users')

async function createUser(req, res) {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = req.body.userName
        const password = req.body.password

        const user = await User.find({userName : {$eq : userName}})

        if(user.length === 0){
            const saltRounds = 10
            const hashedPW = await generatePasswordHash(password, saltRounds)

            const newUser = new User({
                firstName,
                lastName,
                userName,
                password : hashedPW
            })

            const savedUser = await newUser.save()
            res.json({
                success : true,
                user : savedUser
            })
        }
        else {
            res.json({
                success : false,
                message : "User already exits"
            })
        }
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

const login = async (req, res) => {
    try {
        const { userName, password} = req.body;
        const user = await User.findOne({userName : userName})

        if(!user){
            res.json({
                success : false,
                message : 'Could not find user'
            }).status(204)
        }

        const isPWValid = await validatePW(password, user.password)

        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        }

        const userData = {
            userName : user.userName,
        }

        const token = generateUserToken(userData)
        res.json({
            success : true,
            userID : user._id,
            userName : user.userName,
            token
        })
    } catch (error) {
        res.json({
            success : false,
            error : error
        })
    }
}


module.exports = {
    createUser,
    login
}