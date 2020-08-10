const jwt = require('jsonwebtoken'); //Permet la création d'un jeton/token d'authentification pour sécuriser la connexion d'un utilisateur

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Récupération du token provenant de la requête
    const decodedToken = jwt.verify(token, 'bfy4ftaewp0wsngo2wqug3of'); //Fonction qui décode le token
    const userId = decodedToken.userId; //Récupération de l'id de l'utilisateur

    //Si l'id récupéré dans le token n'est pas celui de l'utilisateur, on affiche une erreur
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide')
    });
  }
};