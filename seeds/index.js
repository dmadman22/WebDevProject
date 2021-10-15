const Campground = require("../models/campground")
const mongoose = require("mongoose");
const cities = require("./cities");
const db = mongoose.connection
const { places, descriptors } = require("./seedhelpers")
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log("Connected to MongoDB")
}

const sample = (array) => Math.floor(Math.random() * array.length)

const seedDB = async () =>{
    await Campground.deleteMany({})
    for (let i=0; i<300;i++){
        const random1000 = Math.ceil(Math.random() * 1000)
        const camp = new Campground({
            author: "61591d62275387fdbb41b887",
            title: `${descriptors[sample(descriptors)]} ${places[sample(places)]}`,
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dgcalyxpl/image/upload/v1634177731/YelpCamp/ejpza5gfgttamocdyapi.jpg',
                  filename: 'YelpCamp/ejpza5gfgttamocdyapi',
                }
              ],
            description: "Lorem odio expedita dolor libero enim?",
            price: Math.ceil(Math.random() * 20) + 10
        })
        await camp.save()
    }
}

seedDB().then(()=> db.close())