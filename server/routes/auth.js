const express = require("express");

const router = express.Router();

// Middleware
const { authCheck, adminCheck } = require("../Middlewares/auth");

//Controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth.js");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
