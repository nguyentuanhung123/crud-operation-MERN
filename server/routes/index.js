const express = require('express');
const router = express.Router();

const getUsers = require('../controller/getUsers');
const createUser = require('../controller/createUser');
const updateUser = require('../controller/updateUser');
const deleteUser = require('../controller/deleteUser');

router.get("/", getUsers)
router.post("/create", createUser)
router.put("/update", updateUser)
router.delete("/delete/:id", deleteUser)

module.exports = router;