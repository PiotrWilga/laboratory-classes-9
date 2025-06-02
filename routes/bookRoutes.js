const express = require("express");
const router = express.Router();

// tymczasowy handler
router.get("/", (req, res) => {
  res.json({ message: "Books endpoint works!" });
});

module.exports = router;
