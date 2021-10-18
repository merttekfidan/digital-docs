const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

module.exports = app