const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Document = require('./../models/documentModel');



exports.uploadDocImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeDocImages = catchAsync(async (req, res, next) => {
  //console.log(req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/docs/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${
        i + 1
      }-cover.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/docs/${filename}`);
      req.body.images.push(filename);
    })
  );
  next();
});



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

exports.filterDate = catchAsync(async (req, res, next) => {
  const documents = await Document.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: { data: documents },
  });
});
