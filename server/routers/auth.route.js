const {Router} = require("express");
const { signup, login } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

module.exports = authRouter;