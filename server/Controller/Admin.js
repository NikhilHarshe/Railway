const Admin = require("../Schema/Admin");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const auth = async (req, res, next) => {
    try {
        //extract token
        // console.log("inside Function auth")
        // console.log("req.cookies.token ", req.cookies?.Token);
        // console.log("req.cookies.token 2 : ", req.body?.Token);
        // console.log("req.cookies.token 3 : ", req?.headers.authorization.split(" ")[1]);
        // const token = req.cookies.Token || req.body.Token || req?.headers.authorization?.split(" ")[1];
        const token = req.cookies.Token || req.body.Token || req.header("Authorization").replace("Bearer ", "");
        console.log("inside Function auth", token);

        //if token missing, then return responce
        // console.log("Token ", token);
        if (!token) {
          
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(404).json({
                success: false,
                message: 'Token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}

const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        console.log(req.body);

        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "All Fildes are Required"
            })
        }

        const user = await Admin.findOne({Email});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        if (await bcrypt.compare(Password, user.Password)) {
            const token = jwt.sign(
                { email: user.Email, _id: user._id, role: user.Role },
                process.env.JWT_SECRET, {
                expiresIn: "24h"
            }
            )

            user.token = token
            user.Password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httponly: true,
            }

            res.cookie("Token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        }
        else {
            return res.status(401).json({
                success: false,
                messgae: "Password Invalid",
            })
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Internal Server Error in Login"
        })
    }
}

const SignUp = async (req, res) => {
    try {
        console.log(req.body);
        const { Email, Password, ConfirmPass, Name, Designation, Mobile, Role = "Admin" } = req.body

        if (!Email || !Password || !Name || !Designation || !Mobile || !ConfirmPass) {
            return res.status(400).json({
                success: false,
                message: "All Fildes are required"
            })
        }

        const existingUser = await Admin.findOne({ Email : Email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Alredy Registerd"
            })
        }

        if (Password !== ConfirmPass) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            })
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await Admin.create({
            Email,
            Password: hashedPassword,
            Designation,
            Name,
            Mobile,
            Role,
            Image: `https://api.dicebear.com/5.x/initials/svg?seed=${Name}`,
        })

        return res.status(200).json({
            success: true,
            message: "User Registiered successful",
            user
        })
    }
    catch (error) {
        console.log(error)
        // console.error(error)
        return res.status(400).json({
            success: false,
            message: "Internal Server Error While Registering User",
        })
    }
}

const getUserDetails = async (req, res) => {
    try{

        console.log("Funceiton call backend ");
        const {_id} = req.user;

        console.log("User id in getuserdetails : ",  _id);

        const user = await Admin.findById({_id});

        if(user){
            return res.status(200).json({
                success: true,
                message: "User data Fetch Successful",
                user,
            })
        }
        
        return res.status(401).json({
            success: false,
            message: "User not Fetch"
        })
    }
    catch(error) {
        console.log(error),
        res.status(500).json({
            success: false,
            message: "Internal server Error",
        })
    }
}

const Delete = async (req, res) => {
    try{
        const {_id} = req.user

        console.log("req.user", req.user);

        if(!_id) {
            return res.status(401).json({
                success: false,
                message: "User not Valid"
            })
        }

        const deletedUser = await Admin.findByIdAndDelete({_id});

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfuly",
            user: deletedUser
        })
    }
    catch(error) {
        console.error(error)
        return res.status(401).json({
            success: true,
            messgae: "Internal Server Error While Deleting User",
        })

    }
}


module.exports = {
    auth,
    Login,
    SignUp,
    Delete,
    getUserDetails,
}; 