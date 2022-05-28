const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
const {MONGOURI} = require('./keys');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
})

mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})

require('./models/User');



app.use(require('./routes/auth'))

app.listen(3001,()=>{
    console.log('Port is running on 3001');
});