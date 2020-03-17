const express = require('express');
const app = express();
const storeRoute = express.Router();

let Stores = require('../models/stores');

// Add Stores
storeRoute.route('/add-store').post((req, res, next) => {
    Stores.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Stores
storeRoute.route('/').get((req, res) => {
    Stores.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Stores
storeRoute.route('/read-store/:id').get((req, res) => {
    Stores.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Stores
storeRoute.route('/update-store/:id').put((req, res, next) => {
    Stores.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Store successfully updated!')
    }
  })
})

// Delete Stores
storeRoute.route('/delete-store/:id').delete((req, res, next) => {
    Stores.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = storeRoute;