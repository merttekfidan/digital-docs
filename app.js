const path = require('path');
const express = require('express');
const cors = require('cors');
const documentRouter = require('./routes/documentRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/api/v1/documents', documentRouter);

module.exports = app;
