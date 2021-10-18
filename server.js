const dotenv = require('dotenv')

const app = require('./app')

dotenv.config({ path: './config.env' });

const server = app.listen(3000,()=>{
    console.log('App is on, 3000 PORT')
})