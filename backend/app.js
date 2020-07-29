const express = require('express');

const userRoute = require("routes/user");
const sauceRoute = require("routes/sauce");

//mongoose

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