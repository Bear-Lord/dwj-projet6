const express = require('express'); // Framework d'infrastructure d'applications Web Node.js
const bodyParser = require("body-parser"); //Permet de gérer les demandes POST provenant de l'application front-end
const mongoose = require("mongoose"); //Package qui facilite les interactions avec la base de données MongoDB
const path = require("path"); //Gestionnaire de routage pour les images uploadées ou downloadées
const helmet = require("helmet"); // Permet de sécuriser les en-têtes HTTP

// routes pour user et sauce
const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");

//Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://Bear-lord:projetP6@cluster0.q2ab5.mongodb.net/sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Utilisation du framework express
const app = express();

//Middleware header qui permet à toutes les demandes de toutes les origines d'accéder à notre API 
app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"*"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use(helmet());
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;