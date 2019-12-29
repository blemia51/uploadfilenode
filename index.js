const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const multer = require('multer');
const fs = require('fs');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

const upload = multer({ dest: 'tmp/',
limits: {
  files: 1, // allow only 1 file per request,
  fieldSize: 3* 1024 * 1024 // 3 MB (max file size)
},
fileFilter: (req, file, cb) => {
  // allow png only
  if (!file.originalname.match(/\.(png)$/)) {
      return cb(('Only image png are allowed.'), false);
  }
  cb(null, true);
} 
});

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(
  '<form action="uploaddufichier" method="post"  enctype="multipart/form-data">'+
  '<input type="file" name="uploadfile">'+
  '<input type="submit" value="Envoyer">'+
  '</form>'
);
});

app.post('/uploaddufichier', upload.single('uploadfile'), function (req, res, next) {
  fs.rename(req.file.path, 'img/' + req.file.originalname, function(err){
    if (err) {res.redirect(targetUrl)
        res.send('problème durant le transfert');
    } else {
        res.send('Fichier transféré avec succès');
    }
  });
})

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
	}
	console.log(`Server is listening on ${port}`);
});


