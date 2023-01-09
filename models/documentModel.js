const mongoose = require('mongoose');
/*
  Custom Name,
  Sent By,
  created At - today,
  Sent At - by destination point,
  Expires At,
  categoryId -  [categoryid],
  Thumbnail - [],
  Comment,
  Original Location,
  Pdf Url [url],
  Type,
  Keywords - [],
  Title,
  Permissions - Person

*/
const docsSchema = mongoose.Schema({
  customName: {
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
  expiresAt:Date,
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  thumbnailUrl: String,
  images:[String],
  comment:String,
  originalLocation: {
    type:String,
  },
  sentTo: {
    type: String,
  },
  pdfUrl: [String],
  type: String,
  keywords:[String],
  title:String,
  permission:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Document = mongoose.model('Document', docsSchema);
module.exports = Document;



/*
        Example Data

            "customName": "Elektrik faturası",
            "sentBy": "Elektrik İdaresi",
            "createdAt": "2023-01-09T01:39:51.009Z",
            "sentAt": "2021-01-07T23:52:37.128Z",
            "thumbnailUrl": "urlstring",
            "images": [
                "test image url"
            ],
            "comment": "evin elektrik faturası",
            "originalLocation": "Sarı klasör",
            "sentTo": "Ev",
            "pdfUrl": [
                "url String"
            ],
            "type": "kağıt",
            "keywords": [
                "ev",
                "fatura",
                "kağıt"
            ],
            "title": " Bla Bla Kurumu Elektrik işleri Bla Bla",
            "_id": "63bb70823b58a3808fd430d1",
            "__v": 0
  */