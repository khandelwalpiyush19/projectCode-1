import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'

export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, 'User not found.'))
        }
        res.status(200).json({
            success: true,
            message: 'User data found.',
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        if (!user) {
            return next(handleError(404, 'User not found'))
        }

        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if (data.password && data.password.length >= 8) {
            const hashedPassword = bcryptjs.hashSync(data.password, 10)
            user.password = hashedPassword
        }

        if (req.file) {
            try {
                if (!req.file.path) {
                    throw new Error('No file path available')
                }

                const uploadResult = await cloudinary.uploader.upload(
                    req.file.path,
                    { 
                        folder: 'yt-mern-blog', 
                        resource_type: 'auto',
                    }
                )

                if (!uploadResult?.secure_url) {
                    throw new Error('Cloudinary upload failed - no secure_url returned')
                }

                user.avatar = uploadResult.secure_url
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError)
                return next(handleError(500, 'Failed to upload image'))
            }
        }

        await user.save()

        const newUser = user.toObject()
        delete newUser.password
        return res.status(200).json({
            success: true,
            message: 'Data updated.',
            user: newUser
        })
    } catch (error) {
        console.error('Update user error:', error)
        next(handleError(500, error.message))
    }
}


export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Data deleted.'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}