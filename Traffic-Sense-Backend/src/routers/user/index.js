const express = require('express')
const router = new express.Router()

const userController = require ('../../controllers/user/index')

router.post('/user/create', userController.saveUser)
router.post('/user/login', userController.loginUser)

module.exports = router