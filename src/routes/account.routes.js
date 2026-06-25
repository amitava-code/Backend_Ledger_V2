const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const accounntController = require("../controllers/account.controller")

const router = express.Router()

/**
 * - POST /api/accounts
 * - create a new account 
 * - Protected Route
 */

router.post("/", authMiddleware.authMiddleware, accounntController.createAccountController)

module.exports=router