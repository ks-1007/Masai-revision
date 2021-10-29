const express = require("express")

const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

const newToken = (user) => {
  return jwt.sign({ user: user }, "masaischool")
}
// adding or renewing plan for user
router.post("", authenticate, async (req, res) => {
  const { user } = req.user
  const date = new Date().getTime()
  req.body.subscription_date = date
  const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  })
    .lean()
    .exec()

  const token = newToken(updatedUser)
  return res.status(201).send({ token, updatedUser })
})
module.exports = router
