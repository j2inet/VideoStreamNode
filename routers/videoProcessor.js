const { hasSubscribers } = require('diagnostics_channel');
const fs = require('fs')
const path = require('path');

class VideoProcessor {

    processingInputPath = './processingInput';
    processingOutputPath = './processingOutput';
    completedPath = process.env.VIDEO_ROOT
    

    moveFile(source, destination) {
        return new Promise((resolve, reject)=> {
            fs.rename(source, destination, (err)=> {
                if(!err) {
                    resolve();
                    return;
                }
                if(err.code === 'EXDEV') {
                    this.copyFile(source,destination)
                    .then(()=>{
                        resolve();
                    });
                } else {
                    reject(err);
                }
            });    
        });
    }

    copyFile(source, destination) {
        var readStream = fs.createReadStream(source);
        var writeStream = fs.createWriteStream(destination);
        return new Promise((resolve,reject)=> {
            readStream.on('close', ()=> {
                fs.unlink(source);
                resolve();
            });
            readStream.pipe(writeStream);    
        });
    }

    queueUploadedFile(fileName) {
        let sourcePath = path.join(this.processingInputPath, fileName);
        let destinationPath = path.join(this.processingOutputPath, fileName);
        this.moveFile()
    }
}


module.exports = VideoProcessor;