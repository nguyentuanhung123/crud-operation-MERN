const userModel = require("../models/userModel")

const updateUser = async (req, res) => {
    try {
        const {_id, ...rest} = req.body;

        // console.log(rest);

        const updateUser = await userModel.updateOne({ _id:  _id}, rest)

        return res.status(200).json({
            message: "Update user successfully",
            data: updateUser,
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