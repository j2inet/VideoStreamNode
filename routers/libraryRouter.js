const fs = require('fs');
const express = require('express');
require('dotenv').config();


var router = express.Router();

var fileInformation = { 
    lastUpdated: null, 
    fileList: []
}

function isVideoFile(path) { 
    return path.toLowerCase().endsWith('.mp4')||path.toLowerCase().endsWith('.m4v');
}

function updateFileList() { 
    return new Promise((resolve,reject)=> {
        console.log('getting file list');
        console.log([process.env.VIDEO_ROOT])
        fs.readdir(process.env.VIDEO_ROOT, (err, files) => {
            if(err) reject(err);
            else {
                var videoFiles = files.filter(x=>isVideoFile(x));
                fileInformation.fileList = videoFiles;
                fileInformation.lastUpdated = Date.now();
                resolve(fileInformation);
            } 
        });
    });
}

router.get('/',(req,res,next)=> {
    console.log('library')
    updateFileList()
    .then(fileList => {
        res.json(fileList);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err)
    });
});

module.exports = router;