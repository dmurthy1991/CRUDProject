const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let stores = new Schema({
    id: {
        type: String
    },
  name: {
    type: String
  },
  address: {
      type: String
  },
  city: {
      type: String
  },
  state: {
        type: String
  },
  zip: {
        type: String
  }
}, {
  collection: 'stores'
})

module.exports = mongoose.model('Stores', stores)