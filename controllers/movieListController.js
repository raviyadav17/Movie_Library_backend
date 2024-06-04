const MovieList = require("../models/MovieList");
const User = require("../models/User");

const addToMovieList = async (req, res) => {
  const { userId, movie } = req.body;

  try {
    let userMovieList = await MovieList.findOne({ userId });

    if (!userMovieList) {
      userMovieList = new MovieList({ userId, movies: [movie] });
    } else {
      // Check if the movie with the given imdbID already exists in the movies array
      const movieExists = userMovieList.movies.some(
        (m) => m.imdbID === movie.imdbID
      );

      console.log(movieExists);

      if (movieExists) {
        return res.status(201).json({ message: "Movie already in playlist." });
      }

      userMovieList.movies.push(movie);
    }

    await userMovieList.save();
    res.status(201).json({ message: "Movie added to playlist successfully!" });
  } catch (error) {
    console.error("Error adding movie to playlist:", error);
    res.status(500).json({ message: "Error adding movie to playlist" });
  }
};



const getMovieList = async (req, res) => {
  try {
    const { userId } = req.body;
    const userMovieList = await MovieList.findOne({ userId });

    if (!userMovieList) {
      return res
        .status(404)
        .json({ message: "No movie list found for this user" });
    }

    res.json(userMovieList.movies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




const getPublicMoviesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const usermovieList = await MovieList.findOne({ userId });

    if (!usermovieList) {
      return res.status(404).json({ message: 'Movie list not found' });
    }

    const publicMovies = usermovieList.movies.filter(movie => movie.isPublic);
    res.status(200).json(publicMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public movies', error });
  }
};




const deleteMovieFromList = async (req, res) => {
  const { userId, imdbID } = req.body;

  try {
    const userMovieList = await MovieList.findOne({ userId });
    if (!userMovieList) {
      return res.status(404).json({ message: "User not found" });
    }

    userMovieList.movies = userMovieList.movies.filter((movie) => movie.imdbID !== imdbID);
    await userMovieList.save();

    res.status(200).json({ message: "Movie deleted successfully" , movie: userMovieList.movies});
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToMovieList, getMovieList, getPublicMoviesByUserId, deleteMovieFromList };
