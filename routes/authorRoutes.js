const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Authors endpoint works!" });
});

module.exports = router;
