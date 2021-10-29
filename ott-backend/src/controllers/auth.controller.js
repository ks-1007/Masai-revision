const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const newToken = (user) => {
  return jwt.sign({ user: user }, "masaischool")
}

const login = async (req, res) => {
  // if user with email exists
  const user = await User.findOne({ email: req.body.email }).exec()

  // if not throw error
  if (!user) {
    return res
      .status(400)
      .send({ statue: "failed", message: "Please check your credentials" })
  }

  // if yes check password
  const match = user.checkPassword(req.body.password)
  if (!match)
    return res
      .status(400)
      .send({ status: "failed", message: "Please check credentials" })

  // checking for subscription date
  let { subscription_date } = user
  let date = new Date().getTime()
  if (date - subscription_date > 30 * 24 * 60 * 60 * 1000) {
    const updated_user = await User.findByIdAndUpdate(user._id, {
      subscription: "guest",
    })
  }
  // if password match then create token and send it
  const token = newToken(user)

  return res.status(201).json({ token: token })
}

const register = async (req, res) => {
  let user

  // check if email already exists
  user = await User.findOne({ email: req.body.email }).lean().exec()

  if (user)
    return res.status(400).send({
      message: "email already exists",
    })

  // if not create user
  user = await User.create(req.body)

  if (!user) return res.status(500).send({ message: "please try again later" })

  // create a token and return it
  const token = newToken(user)

  return res.status(201).json({ token })
}

module.exports = { register, login }
