const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoute = require("routes/user");
const sauceRoute = require("routes/sauce");

mongoose.connect('mongodb+srv://Bear-lord:projetP6@cluster0-shard-00-00.q2ab5.mongodb.net:27017/sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"*"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, Content, Accept, Content-Type, Authorization, X-Requested-With"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});


app.use(bodyParser.json());

app.use("/images", express.static(path.join(_dirname, "images")));

app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;