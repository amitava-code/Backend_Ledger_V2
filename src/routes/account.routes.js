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


/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.authMiddleware, accounntController.getUserAccountsController)

module.exports=router