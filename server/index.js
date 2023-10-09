const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

const socket = require("socket.io")
const app = express()
require("dotenv").config()


app.use(cors());
app.use(express.json())

app.use("/api/auth", userRouter)
app.use("/api/messages", messageRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successfull");
}).catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("aaaaaaa")
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log("abcc", userId)
        onlineUsers.set(userId, socket.id);
    });

    console.log("online", onlineUsers)

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        console.log("bbbb", data)
        if (sendUserSocket) {
            console.log("aaa", sendUserSocket)
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            console.log("aaaa", data.msg)
        }
    });
})