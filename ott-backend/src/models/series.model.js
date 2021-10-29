const mongoose = require("mongoose")

const seriesSchema = new mongoose.Schema(
  {
    star_cast: [{ type: String, required: true }],
    director: { type: String, required: true },
    release_date: { type: Date, required: true },
    rating: { type: Number, required: true },
    genre: { type: String, required: true },
    class: { type: String, required: true },
    series_number: { type: Number, required: true },
    episode_number: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

module.exports = mongoose.model("series", seriesSchema)
