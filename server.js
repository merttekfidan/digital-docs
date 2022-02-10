const mongoose =require('mongoose') 
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const app = require('./app')

const DB = process.env.MONGODB_URI.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection successful!');
    });



const port = process.env.PORT || 8000;
const server = app.listen(port,()=>{
    console.log('App is on, 8000 PORT')
})