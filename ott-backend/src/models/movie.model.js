const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
  {
    star_cast: [{ type: String, required: true }],
    director: { type: String, required: true },
    release_date: { type: Date, required: true },
    rating: { type: Number, required: true },
    genre: { type: String, required: true },
    class: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

module.exports = mongoose.model("movie", movieSchema)
