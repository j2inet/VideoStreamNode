//Do not use. For demonstration purposes only. While this
//appears to work. But the entire file is loaded to memory
//before being written to disk. I've found with large files
//this can easily slow down or halt the Pi. Use the router
//named largeUpload instead.
//
//Uses Busboy. See: https://github.com/mscdex/busboy

const express = require('express');
const router = express.Router();
const busboy = require('connect-busboy');


const UPLOAD_FOLDER = 'uploads';

router.post('/', async(req,res, next) => {
	try {
        console.log('starting upload');
        req.pipe(req.busboy);        
        req.busboy.on('file', (fieldname, uploadingFile, filename) => {
            console.log(`Saving ${filename}`);

            var targetPath = path.join(UPLOAD_FOLDER, filename);            
            const fileStream = fs.createWriteStream(targetPath);
            uploadingFile.pipe(fileStream);
            fileStream.on('close', ()=> {
                console.log(`Completed upload ${filename}`);
                res.redirect('back');
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;