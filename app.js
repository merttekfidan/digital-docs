const express = require('express')
const documentRouter = require('./routes/documentRoutes')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/documents',documentRouter)

module.exports = app