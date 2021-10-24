const {Router} = require("express");
const {create} = require("../controllers/comment.controller.js");
const router = Router();

// /api/comment
router.post("/", create);

module.exports = router;
