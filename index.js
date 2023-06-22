const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
var path = require('path')

const { userRoutes } = require('./routes/userRoutes');
const { uploadRoutes } = require('./routes/uploadRoutes');

const { db } = require('./config/db');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/images', express.static(path.join(__dirname, 'images')));



app.use(fileUpload());


db.connect()


app.post('/api/upload', (req,res) => {
    

     let extName = path.extname(req.files.profileImg.name);

    if(extName == ".jpeg" || extName == ".jpg" || extName == ".png"){
        req.files.profileImg.mv(__dirname + "/images/"+ uuidv4() + extName)
        res.send('OK')
    }
    else{
        res.status(500).send("Ext error");
    }


})


app.get('/',(req,res) => {
    res.send('OK')
})

a



app.listen(3000, () => {
    console.log('Server is running...');
})





