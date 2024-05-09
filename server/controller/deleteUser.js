const userModel = require("../models/userModel")

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteUser = await userModel.deleteOne({_id: id})

        return res.status(200).json({
            message: "Delete user successfully",
            data: deleteUser,
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

module.exports = deleteUser;