const express = require("express")

const connect = require("./configs/db")

const app = express()
app.use(express.json())

const userController = require("./controllers/user.controller")
const contentController = require("./controllers/content.controller")
const { register, login } = require("./controllers/auth.controller")

app.post("/register", register)
app.post("/login", login)
app.use("/users", userController)
app.use("/contents", contentController)

app.listen(5421, async function () {
  await connect()
  console.log("listening on port 5421")
})
