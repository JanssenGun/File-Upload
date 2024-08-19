const express = require('express');
app = express();

app.use(express.static(__dirname));

const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: fileStorage });

app.post('/uploads', upload.single('myFile'), (req, res) => {
    console.log(req.file);
    req.file.mimetype = mime.lookup(req.file.originalname);

    res.sendFile(path.join(__dirname, 'file-uploaded.html'));
});

app.get('/file-upload', (req, res) => {
    res.sendFile(__dirname + '/' + 'file-upload.html')
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});