const bcrypt = require("bcrypt"); //Permet d'hacher les mots de passe
const jwt = require("jsonwebtoken"); //Permet la création d'un jeton/token d'authentification pour sécuriser la connexion d'un utilisateur
const passwordValidator = require("password-validator"); //Permet de vérifier la complexité d'un mot de passe

const User = require("../models/User");

let schema = new passwordValidator();
//Le mot de passe doit contenir au minimum 8 caractères, au maximum 20 caractères, doit avoir au moins une majuscule, une minuscule, un nombre et pas d'espace
schema.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces();

//Création d'un compte utilisateur
exports.signup = (req, res, next) => {
	if(!schema.validate(req.body.password)){
		return res.status(400).json({
        	error: "Le mot de passe entré n'est pas correctement formaté."
        });
	} else {
		bcrypt.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
			   	email: req.body.email,
			   	password: hash
			});
			user.save().then(
			    () => {
			      	res.status(201).json({
			        	message: 'Utilisateur enregistré!'
			      	});
			    }
			).catch(
			    (error) => {
			      	res.status(400).json({
			        	error: error
			     	});
			    }
			);
		}).catch(
		    (error) => {
		     	res.status(400).json({
		        	error: error
		      	});
		    }
		);
	}
};

//Connexion à un compte existant
exports.login = (req, res, next) => {
	User.findOne({email : req.body.email}).then(
    (user) => {
    	if(!user){
    		return res.status(400).json({
		        error: "Utilisateur non trouvé."
		    });
    	}
    	bcrypt.compare(req.body.password, user.password).then(
    		(valid) => {
    			if(!valid){
		    		return res.status(400).json({
				        error: "Mot de passe incorrect."
				    });
		    	}
		    	res.status(200).json({
		    		userId : user._id,
		    		token : jwt.sign({userId : user._id}, "bfy4ftaewp0wsngo2wqug3of", { expiresIn : "24h"})
		    	});
    		}
    		).catch(
			    (error) => {
			      	res.status(500).json({
			       		error: error
			      	});
			    }
			);
    }
	).catch(
	    (error) => {
	      	res.status(500).json({
	       		error: error
	      	});
	    }
	);
};
