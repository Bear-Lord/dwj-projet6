const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
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
	        	error
	      	});
	    }
	);
};

exports.updateSauce = (req, res, next) => {
	const sauceReq = req.file
	? {
		...JSON.parse(req.body.sauce),
		imageUrl :  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	}
	: {...req.body};
	if(req.file){
		Sauce.findOne({_id: req.params.id}).then(
		(sauce) => {
			const fileName = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${fileName}`, () => {
				Sauce.updateOne(
					{_id: req.params.id},
					{...sauceReq,
					_id: req.params.id}
				).then(
				    () => {
				      	res.status(200).json({
				        	message: 'Sauce mise à jour'
				      	});
				    }
				).catch(
				    (error) => {
				      	res.status(400).json({
				        	error: error
				      	});
				    }
				);
			});
		}
		).catch(
		    (error) => {
		      	res.status(500).json({
		        	error: error
		      	});
		    }
		);
	} else {
		Sauce.updateOne(
			{_id: req.params.id},
			{...sauceReq,
			_id: req.params.id}
		).then(
		    () => {
		      	res.status(200).json({
		        	message: 'Sauce mise à jour'
		      	});
		    }
		).catch(
		    (error) => {
		      	res.status(400).json({
		        	error: error
		      	});
		    }
		);
	}
};

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({_id: req.params.id}).then(
		(sauce) => {
			const fileName = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${fileName}`, () => {
				Sauce.deleteOne({_id: req.params.id}).then(
				    () => {
				      	res.status(200).json({
				        	message: 'Sauce supprimée'
				      	});
				    }
				).catch(
				    (error) => {
				      	res.status(400).json({
				        	error: error
				      	});
				    }
				);
			});
		}
	).catch(
	    (error) => {
	      	res.status(500).json({
	        	error: error
	      	});
	    }
	);
	
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {
	switch(req.body.like){
		case 0:
			Sauce.findOne({_id: req.params.id}).then(
				(sauce) => {
					if(sauce.usersLiked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {likes: -1},
								$pull: {usersLiked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Like enlevé"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}

					if(sauce.usersDisliked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {dislikes: -1},
								$pull: {usersDisliked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Dislike enlevé"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}
				}
			).catch(
			    (error) => {
			      	res.status(400).json({
			       	 	error: error
			      	});
			    }
			 );
			break;
		case 1:
			Sauce.findOne({_id: req.params.id}).then(
				(sauce) => {
					if(!sauce.usersLiked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {likes: 1},
								$push: {usersLiked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Like ajouté"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}

					if(sauce.usersDisliked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {dislikes: -1},
								$pull: {usersDisliked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Dislike enlevé"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}
				}
			).catch(
			    (error) => {
			      	res.status(400).json({
			       	 	error: error
			      	});
			    }
			 );

			break;
		case -1:

			Sauce.findOne({_id: req.params.id}).then(
				(sauce) => {
					if(sauce.usersLiked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {likes: -1},
								$pull: {usersLiked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Like enlevé"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}

					if(!sauce.usersDisliked.find((user) => user === req.body.userId)){
						Sauce.updateOne(
							{_id: req.params.id},
							{
								$inc: {dislikes: 1},
								$push: {usersDisliked: req.body.userId},
								_id: req.params.id
							}
						).then(() => {
						    res.status(200).json({message: "Dislike ajouté"});
						}
						).catch(
						    (error) => {
						      	res.status(400).json({
						        	error: error
						      	});
						    }
						);
					}
				}
			).catch(
			    (error) => {
			      	res.status(400).json({
			       	 	error: error
			      	});
			    }
			);
			break;
		default:
			console.error("Mauvaise valeur");
	}
};
