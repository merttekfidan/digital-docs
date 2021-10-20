const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Document = require('./../models/documentModel');

exports.createDocument = catchAsync(async (req, res, next) => {
  const documents = await Document.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { data: documents },
  });
});

exports.getAllDocuments = catchAsync(async (req, res, next) => {
  const documents = await Document.find();
  res.status(200).json({
    status: 'success',
    data: { data: documents },
  });
});

exports.getOneDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id);
  if (!document) return next(new AppError('No document found with that ID!', 404));
  res.status(200).json({
    status: 'success',
    data: { data: document },
  });
});

exports.updateDocument = catchAsync(async (req, res, next) => {
  const documents = await Document.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!documents) return next(new AppError('No document found with that ID!', 404));
  res.status(200).json({
    status: 'success',
    data: { data: documents },
  });
});

exports.deleteDocument = catchAsync(async (req, res, next) => {
  const documents = await Document.findByIdAndDelete(req.params.id);
  if (!documents) return next(new AppError('No document found with that ID!', 404));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
