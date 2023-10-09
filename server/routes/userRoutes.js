const { register, login, getAllUsers } = require("../controllers/usersController");

const userRouter = require("express").Router();


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/allusers/:id", getAllUsers)

module.exports = userRouter