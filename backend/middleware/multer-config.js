const multer = require('multer'); // Package qui permet de gérer les fichiers entrant dans les requêtes HTTP

//types d'extensions autorisées pour les images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // Destination d'enregistrement des fichiers
    callback(null, 'images');
  },
  filename: (req, file, callback) => { //Paramétrage du nom des fichiers
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');