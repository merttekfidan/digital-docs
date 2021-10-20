const mongoose = require('mongoose');
const docsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Doc must have a name'],
  },
  sentBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sentAt: {
    type: Date,
  },
  category: {
    type: String,
  },
  images: [String],
  description: {
    type: String,
  },
  original: {
    type: String,
    enum: ['mail', 'document', null],
  },
  sentTo: {
    type: String,
  },
  pdfUrl: {
    type: String,
  },
});

const Document = mongoose.model('Document', docsSchema);
module.exports = Document;
