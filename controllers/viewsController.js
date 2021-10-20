const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Document = require('./../models/documentModel');
exports.getAllDocuments = catchAsync(async (req, res, next) => {
  const documents = await Document.find();
  if (!documents) return next(new AppError('No document found with that ID!', 404));

  res.status(200).render('docs', {
    title: 'All Documents',
    documents,
  });
});
