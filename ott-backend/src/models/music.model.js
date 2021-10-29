const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema(
  {
    singer: { type: String, required: true },
    music_director: { type: String, required: true },
    lyricist: { type: String, required: true },
    genre: { type: String, required: true },
    class: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
module.exports = mongoose.model("music", musicSchema)
