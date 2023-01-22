const mongoose = require('mongoose');
/*
    name,
    images : ['url'] 
*/
const categorySchema = mongoose.Schema({
  customName: {
    type: String,
  },
  images: [String],
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
