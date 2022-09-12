//Do not use. For demonstration purposes only. While this
//appears to work. But the entire file is loaded to memory
//before being written to disk. I've found with large files
//this can easily slow down or halt the Pi. Use the router
//named largeUpload instead.

const express = require('express');
const router = express.Router();


router.post('/', async(req,res) => {
	try {
		if(!req.files) {
			console.log(req.body);
			res.send({
				status: false,
				message: 'No File'
			});
		} else {
			let video = req.files.video;
			video.mv('./uploads/' + video.name);
			res.send({
				status: true,
				message: ' File Uploaded',
				data: {
					name: video.name,
					mimetype: video.mimetype,
					size: video.size
				}
			});
		}
	} catch(err) {
		res.status(500).send(err);
	}
});


module.exports = router;
