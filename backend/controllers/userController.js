import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //validation

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            next(handleError(400, "User already exists"));
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        /* await User.create({ fullName, email, password: hashedPassword });
         return res.status(201).json({
             success: true,
             message: "User created successfully"
         });*/
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }
        const user = await User.findOne({ email });
        if (!user) {
            next(handleError(400, "INVALID CREDENTIALS"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            next(handleError(400, "INVALID CREDENTIALS"));
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
            process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            //make it true iin development
            secure: false,
            //production = none
            sameSite: "strict",
            "path": "/"
        })

        const newUser = user.toObject({getters : true})
        delete newUser.password
        res.status(200).json({
            success: true,
            newUser,
            message: "User logged in successfully",
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const googleLogin = async (req, res, next) => {
    try {
        const { name ,email, avatar } = req.body;
        let user ;
         user = await User.findOne({ email });
        if (!user) {
           const pasword =  Math.random().toString()
           const hashedPassword =  await bcrypt.hash(pasword, 12);
           const newUser = new User({
               name,email,password:hashedPassword,avatar
           })
           user = await newUser.save();
        }
        

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
            process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            //make it true iin development
            secure: false,
            //production = none
            sameSite: "strict",
            "path": "/"
        })

        const newUser = user.toObject({getters : true})
        delete newUser.password
        res.status(200).json({
            success: true,
           user: newUser,
            message: "User logged in successfully",
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const logout = async (_, res,next) => {
    try {
        res.clearCookie("access_token",{
            httpOnly: true,
            //make it true iin development
            secure: false,
            //production = none
            sameSite: "strict",
            "path": "/"
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}