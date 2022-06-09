const express = require("express");
const waiitlistController = require("../controllers/waitlist");
const router = express.Router();

router.post("/", waiitlistController.postWaitlist);
router.get("/", waiitlistController.getWaitlist);

module.exports = router;
