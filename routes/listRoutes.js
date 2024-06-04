const express = require('express');
const { addToMovieList, getMovieList, getPublicMoviesByUserId, deleteMovieFromList } = require("../controllers/movieListController");
const { verifytoken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/movies/public/:userId", getPublicMoviesByUserId);
router.post("/addmovie", verifytoken, addToMovieList);
router.post("/getmovielist", verifytoken, getMovieList);
router.delete('/deletemovie', verifytoken, deleteMovieFromList);

module.exports = router;
