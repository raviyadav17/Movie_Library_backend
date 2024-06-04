const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true },
  year: { type: String, required: true },
  poster: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
});

const movieListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movies: [movieSchema],
  },
  {
    timestamps: true,
  }
);

const MovieList = mongoose.model("MovieList", movieListSchema);

module.exports = MovieList;
