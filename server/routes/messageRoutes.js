const { addMessage, getAllMessage } = require("../controllers/messageController");

const messageRoutes = require("express").Router();

messageRoutes.post("/addmsg/", addMessage)
messageRoutes.post("/getmsg/", getAllMessage)

module.exports = messageRoutes