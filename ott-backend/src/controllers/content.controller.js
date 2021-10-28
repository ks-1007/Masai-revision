const express = require("express")

const Movie = require("../models/movie.model")

const authenticate = require("../middlewares/authenticate")

const router = express.Router()

router.get("", authenticate, async (req, res) => {
  const { user } = req.user
  console.log(user)
  let movies
  if (!user) {
    movies = await Movie.find({ class: "guest" }).lean().exec()
  } else {
    const subscription = user.subscription
    if (subscription === "guest") {
      movies = await Movie.find({ class: "guest" }).lean().exec()
    } else if (subscription === "basic") {
      movies = await Movie.find({
        $or: [{ class: "guest" }, { class: "basic" }],
      })
        .lean()
        .exec()
    } else {
      movies = await Movie.find().lean().exec()
    }
  }

  return res.status(201).send({ movies })
})

module.exports = router
