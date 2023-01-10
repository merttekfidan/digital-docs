const express = require('express');
const documentController = require('./../controllers/documentController');

const router = express.Router();


// Filtering data by date
router.route('/filter-date').get(documentController.filterDate);

// CRUD
router.route('/').get(documentController.getAllDocuments).post(documentController.uploadDocImages, documentController.resizeDocImages ,documentController.createDocument);
router
  .route('/:id')
  .get(documentController.getOneDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);


module.exports = router;
