const express = require('express');
const viewsController = require('./../controllers/viewsController');
const router = express.Router();

router.get('/', viewsController.getAllDocuments);
router.get('/filter', viewsController.filterDate);

module.exports = router;
