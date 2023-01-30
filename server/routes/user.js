const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "You have hit the user API Endpoint",
  });
});

module.exports = router;
