const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {port} = require('./config/config');
const {sequelize} = require('./models');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('Kazakhstan'));
app.use(cors());
app.use('/uploadAvatar', express.static('uploadAvatar'));

const storage =require('./imagesStorage/imagesStorage')(multer,fs) ;

const fileFilter=require('./fileFilter/fileFilter');

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15,
    },
    fileFilter: fileFilter,
});

console.log('app call!');
require('./routes')(app, upload);

sequelize.sync()
    .then(() => {
        app.listen(port);
        console.log('server start on ' + port);
    });


