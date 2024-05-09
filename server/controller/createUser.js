const userModel = require("../models/userModel")

const createUser = async (req, res) => {

    const {name, email, mobile} = req.body;
    console.log(req.body);

    try {
        if(!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if(!name) {
            return res.status(400).json({
                message: "Please provide name",
                error: true,
                success: false
            })
        }

        if(!mobile) {
            return res.status(400).json({
                message: "Please provide mobile",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email: email})

        if(user) {
            return res.status(400).json({
                message: "Already user exits",
                error: true,
                success: false
            })
        }

        const payload = {
            name, email, mobile
        }

        const userDetails = new userModel(payload)
        const userSaved = await userDetails.save()

        return res.status(200).json({
            message: "User created successfully",
            data: userSaved,
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

module.exports = createUser;