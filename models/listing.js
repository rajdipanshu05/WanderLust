const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
        },
        url:{
            type: String,
            default: "https://media.istockphoto.com/id/1151755587/photo/sunrise-behind-a-tropical-island-in-the-maldives.jpg?s=1024x1024&w=is&k=20&c=rFzBaIblaDbkFSVyQOjXCcCmDLTWgTCqmJWqMLVcZQ4=",
            set: (v) => v === "" 
            ? "https://media.istockphoto.com/id/1151755587/photo/sunrise-behind-a-tropical-island-in-the-maldives.jpg?s=1024x1024&w=is&k=20&c=rFzBaIblaDbkFSVyQOjXCcCmDLTWgTCqmJWqMLVcZQ4=" 
            : v,
        },
        
    },
    price: {
        type: Number,

    },
    location: {
        type: String,

    },
    country: {
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;