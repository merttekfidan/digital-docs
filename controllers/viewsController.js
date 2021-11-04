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

exports.filterDate = catchAsync(async (req, res, next) => {
  const categories = await Document.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date('2021-11-25T09:00:00.000+00:00'),
          $gte: new Date('2021-11-10T09:00:00.000+00:00'),
        },
      },
    },
  ]);
  res.status(200).render('dateFilter', {
    title: 'Date Filter',
    categories,
  });
});
