const http = require('http'); // Importation du package http qui permet de créer un serveur
const app = require('./app'); // Utilisation de l'application sur le serveur

 // permet de renvoyer un port valide, qu'il soit fournit sous la forme d'un numéro ou d'une chaîne de caractères
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); //Utilisation par défaut du port 3000
app.set('port', port);

 // Recherche les différentes erreurs et les traîte de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Création du serveur qui utilise app
const server = http.createServer(app);

server.on('error', errorHandler);

//écoute les événements concernant le port nommé sur lequel le serveur s'exécute dans la console
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Le serveur écoute le port défini plus haut
server.listen(port);
