const { Router } = require("express");
const { postGenerate } = require("../controllers/ai.controller");

const router = Router();

router.post("/generate/test", (req, res) => {
  res.send("helo");
});
router.post("/generate/:mediaType", postGenerate);

module.exports = router;
