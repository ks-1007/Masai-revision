const express = require("express")

const Movie = require("../models/movie.model")
const Music = require("../models/music.model")
const Series = require("../models/series.model")
const authenticate = require("../middlewares/authenticate")

const router = express.Router()

router.get("", authenticate, async (req, res) => {
  const { user } = req.user

  let movies, musics, series

  if (!user) {
    movies = await Movie.find({ class: "guest" }).lean().exec()
    musics = await Music.find({ class: "guest" }).lean().exec()
    series = await Series.find({ class: "guest" }).lean().exec()
  } else {
    const subscription = user.subscription
    if (subscription === "guest") {
      movies = await Movie.find({ class: "guest" }).lean().exec()
      musics = await Music.find({ class: "guest" }).lean().exec()
      series = await Series.find({ class: "guest" }).lean().exec()
    } else if (subscription === "basic") {
      movies = await Movie.find({
        $or: [{ class: "guest" }, { class: "basic" }],
      })
        .lean()
        .exec()
      musics = await Music.find({
        $or: [{ class: "guest" }, { class: "basic" }],
      })
        .lean()
        .exec()
      series = await Series.find({
        $or: [{ class: "guest" }, { class: "basic" }],
      })
        .lean()
        .exec()
    } else {
      movies = await Movie.find().lean().exec()
      musics = await Music.find().lean().exec()
      series = await Series.find().lean().exec()
    }
  }

  return res.status(201).send({ movies, musics, series })
})

module.exports = router
