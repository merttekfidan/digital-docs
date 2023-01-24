const multer = require("multer");
var path = require("path");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Document = require("./../models/documentModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${path.extname(file.originalname)}`;
    //dosya uzantısını otomatik çek
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

//  req.files['avatar'][0] -> File
//  req.files['gallery'] -> Array

exports.uploadFiles = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "thumbnailUrl", maxCount: 1 },
  { name: "pdfUrl", maxCount: 10 },
]);

exports.uploadDocImages = catchAsync(async (req, res, next) => {
  req.body.images = [];
  req.body.thumbnailUrl = [];
  req.body.pdfUrl = [];

  // images
  if (req.files.images) {
    req.files["images"].forEach((element) => {
      req.body.images.push(element.path);
    });
  }
  if (req.files.thumbnailUrl) {
    req.files["thumbnailUrl"].forEach((element) => {
      req.body.thumbnailUrl.push(element.path);
    });
  }
  if (req.files.pdfUrl) {
    req.files["pdfUrl"].forEach((element) => {
      req.body.pdfUrl.push(element.path);
    });
  }

  // thumbnailUrl must be written???

  // pdfUrl must be written???

  req.body.images.forEach((e) => console.log(e));
  console.log("req.body.images : ", req.body.images);
  console.log("req.body.pdf : ", req.body.pdfUrl);
  console.log("req.body.thumbnailUrl : ", req.body.thumbnailUrl);
  res.status(201).json({
    status: "success",
  });
});

exports.createDocument = catchAsync(async (req, res, next) => {
  //Validations should be added
  const documents = await Document.create(req.body);
  res.status(201).json({
    status: "success",
    data: { data: documents },
  });
});

exports.getAllDocuments = catchAsync(async (req, res, next) => {
  const documents = await Document.find();
  res.status(200).json({
    status: "success",
    data: { data: documents },
  });
});

exports.getOneDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id);
  if (!document)
    return next(new AppError("No document found with that ID!", 404));
  res.status(200).json({
    status: "success",
    data: { data: document },
  });
});

exports.updateDocument = catchAsync(async (req, res, next) => {
  const documents = await Document.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!documents)
    return next(new AppError("No document found with that ID!", 404));
  res.status(200).json({
    status: "success",
    data: { data: documents },
  });
});

exports.deleteDocument = catchAsync(async (req, res, next) => {
  const documents = await Document.findByIdAndDelete(req.params.id);
  if (!documents)
    return next(new AppError("No document found with that ID!", 404));
  res.status(204).json({
    status: "success",
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
    status: "success",
    data: { data: documents },
  });
});
