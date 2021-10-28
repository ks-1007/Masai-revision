const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "masaischool", (err, user) => {
      if (err) return reject(err)

      if (user) return resolve(user)
    })
  })
}

const authenticate = async function (req, res, next) {
  // to ensure token is sent in request  header
  bearerToken = req?.headers?.authorization
  console.log("bearerToken:", bearerToken)

  let user = null
  if (bearerToken) {
    const token = bearerToken.split(" ")[1]
    console.log("token:", token)
    try {
      user = await verifyToken(token)
      console.log("user:", user)
    } catch (err) {
      console.log("err:", err)
    }
  }
  if (!user) {
    req.user = { user }
  } else {
    req.user = user
  }
  next()
}

module.exports = authenticate
