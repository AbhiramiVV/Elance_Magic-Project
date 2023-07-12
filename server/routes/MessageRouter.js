const express = require("express");
const router = express.Router();

const Message = require("../controllers/MessageController");

router.post("/", Message.addMessage);
router.get("/:chatId", Message.getMessages);

module.exports = router;
