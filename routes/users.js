const express = require("express")
const router = express.Router()
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const users = require("../controllers/users")

router.get("/register", (req, res) => {
    res.render("users/register")
})

router.post("/register", catchAsync(users.register))

router.get("/login", users.login)

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.auth)

router.get("/logout", users.logout)

module.exports= router
