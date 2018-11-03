//Get messages.js - Get Message route module
var express = require('express');
var router = express.Router();

const multer = require('multer');




//Storing documents/Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//upload-file 

router.post('/', upload.array('photos', 5), (req, res) => {
    console.log('req.body', req.body);
    res.end();
});

module.exports = router;
