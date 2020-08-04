const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const User = require("../models/User");

let schema = new passworValidator();
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


// à faire
exports.login = (req, res, next) => {
	const sauceReq = JSON.parse(req.body.sauce);
	  const sauce = new Sauce({
	   	...sauceReq,
	 	imageUrl: '${req.protocol}://${req.get("host")}/images/${req.file.filename}',
	  	likes: 0,
	  	dislikes: 0,
	  	usersLiked: [],
	  	usersDisliked: [],
	  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce enregistrée!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
