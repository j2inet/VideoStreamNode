
//Uses Busboy. See: https://github.com/mscdex/busboy

const express = require('express');
const router = express.Router();
const path = require('node:path');
const Busboy = require('connect-busboy');
var fs = require("fs");


const UPLOAD_FOLDER = 'uploads';


if(!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

router.post('/', async(req,res, next) => {
	try {        
        
        console.log('starting upload');        
        console.log(req.busboy);

        req.busboy.on('field', (name, val, info)=> {
            console.log(name);
        });
        
        req.busboy.on('file', (fieldname, uploadingFile, fileInfo) => {
            console.log(`Saving ${fileInfo.filename}`);

            var targetPath = path.join(UPLOAD_FOLDER, fileInfo.filename);
            const fileStream = fs.createWriteStream(targetPath);
            uploadingFile.pipe(fileStream);
            fileStream.on('close', ()=> {
                console.log(`Completed upload ${fileInfo.filename}`);
                res.redirect('back');
            });
        });
        req.pipe(req.busboy);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;