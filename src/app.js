const express=require('express');
const app=express();
const morgan=require('morgan');
//import database
const PORT=3000;

const {mongoose}=require('./database')

// settings
app.set('port', process.env.PORT || PORT);

// middlewares
app.use(morgan('dev'));
app.use(express.json())


// routes
app.use(require('./routes/ad.routes'));

// static files

// srunning server
app.listen(app.get('port'),()=>{
    console.log(`Server running on PORT ${app.get('port')}`)
})
