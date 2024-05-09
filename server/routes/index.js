const express = require('express');
const router = express.Router();

const getUsers = require('../controller/getUsers');
const createUser = require('../controller/createUser');
const updateUser = require('../controller/updateUser');

router.get("/", getUsers)
router.post("/create", createUser)
router.put("/update", updateUser)

module.exports = router;