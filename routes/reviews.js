const express = require("express")
const router = express.Router({mergeParams: true})
const { reviewSchema } = require("../schemas.js")
const Review = require("../models/review")
const Campground = require("../models/campground")
const catchAsync = require("../utils/catchAsync")
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware")
const reviews = require("../controllers/reviews")



router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.delete))

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.new))

module.exports = router