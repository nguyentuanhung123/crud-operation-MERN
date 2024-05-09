const userModel = require("../models/userModel")

const updateUser = async (req, res) => {
    try {
        const {id} = req.body;

        await userModel.updateOne({ _id:  id}, { name: 'Ngoc Hiep 112' })

        return res.status(200).json({
            message: "Update user successfully",
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

module.exports = updateUser;