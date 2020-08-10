//Schéma de données strict des utilisateurs

const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); //Permet de vérifier l'unicité d'un champ

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true}, //On s'assure que l'adresse e-mail soit unique pour chaque utilisateur.
  password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

// Exportation du schéma en tant que modèle pour le rendre disponible sur l'application
module.exports = mongoose.model('User', userSchema);