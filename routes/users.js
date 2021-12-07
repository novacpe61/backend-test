var express = require('express');
var multer = require('multer');
var router = express.Router();
const fs = require('fs');
const userController = require('../controllers/userController');

const path = 'files';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.readdir(path, (err, files) => {
      files.forEach(file => {
        console.log(file);
        fs.unlink(path + file, function (err) {
          if (err) throw err;
          console.log('File '+ file +' has deleted!');
        });
      });
    });
    cb(null, path)
  },
  filename: function (req, file, cb) {
    console.log(file)
    const newfilename = Date.now() + '-' + file.originalname
    cb(null, newfilename)
    console.log('Upload file ' + newfilename + ' success!')
  }
});

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', userController.index);
router.post('/upload', upload.single('file'),userController.upload);

module.exports = router;
