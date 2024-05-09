const userModel = require("../models/userModel")

const getUsers = async (req, res) => {
    try {
        // console.log("userId: ", req.userId);

        const users = await userModel.find({})

        return res.status(200).json({
            message: "All Users",
            data: users,
            error: false,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
            error: true,
            success: false
        })
    }
}

module.exports = getUsers;