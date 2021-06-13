const express = require('express');
const ejs = require('ejs');
const expressLayout=require('express-ejs-layouts'); 
const path = require('path');
const app=express();

// app.set('view engine','pug')
// app.set('views',path.join(__dirname,'views'))
//Assets we use to use the
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('home');
})

app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');
const PORT=process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})