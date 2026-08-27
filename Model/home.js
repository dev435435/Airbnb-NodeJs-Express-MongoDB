const mongoose = require('mongoose');



const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  Pricepernight: { type: String, required: true },
  Locations: { type: String, required: true },
  Ratings: { type: Number, required: true },
  Photo: String,
  description:String,
});

// homeSchema.pre('findOneAndDelete',async function(next) {
//   console.log('Came to pre hook while deleting a home');
//  const homeID = this.getQuery()._id;
//  await favourites.deleteMany({houseID : homeID});
 
// });

module.exports = mongoose.model('Home',homeSchema);
