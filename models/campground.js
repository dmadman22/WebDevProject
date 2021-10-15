const mongoose = require("mongoose")
const review = require("./review")
const Schema = mongoose.Schema
const options = { toJSON: { virtuals: true } }

const CampgroundSchema = Schema({
    title: String,
    price: Number,
    images: [
        { 
            url: String,
        filename: String
        }
    ],
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, options)

CampgroundSchema.virtual("properties.popupMarkup").get(function() {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`
})

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if(doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Campground", CampgroundSchema)
