const express = require("express");
const bouncer = require("express-bouncer")(10000, 600000, 3);
//Bouncer pour éviter les attaques de force brute. Si un mot de passe erroné est rentré 3 fois, un délai entre 10s et 600s est mis en place avant de pouvoir se reconnecter.

const router = express.Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", bouncer.block, userController.login);

module.exports = router;