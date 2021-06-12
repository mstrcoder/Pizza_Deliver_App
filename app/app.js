const express = require('express');
const pug = require('pug');
const path = require('path');
const app=express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render("hello From Server");
})



module.exports=app;