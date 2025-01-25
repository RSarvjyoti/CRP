const express = require("express");
const {config} = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routers/auth.route");
const cors = require('cors');
const referralRoute = require("./routers/referralRoutes");
config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9080
const DB_URL = process.env.DB_URL;

app.get('/', (req, res) => {
    res.send("Home routes");
})

app.use('/auth', authRouter);
app.use("/referrals", referralRoute);

app.listen(PORT, async () => {
    connectDB(DB_URL);
    console.log(`Server is running at http://localhost:${PORT}`);
})