const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.put("/:id", auth, multer, sauceController.updateSauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.post("/:id/like", auth, multer, sauceController.likeSauce);
router.get("/", auth, sauceController.getAllSauces);
router.get("/:id", auth, sauceController.getOneSauce);

module.exports = router;