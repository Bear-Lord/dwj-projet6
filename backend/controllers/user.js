const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const User = require("../models/User");

let schema = new passwordValidator();
schema.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces();

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
		    		token : jwt.sign({userId : user._id}, "RANDOM_TOKEN_SECRET", { expiresIn : "24h"})
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
