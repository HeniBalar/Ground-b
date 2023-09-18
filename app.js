const express = require('express');
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser');
const userRouter = require("./routes/userRoutes");
const ownerRouter = require("./routes/ownerRoutes");
const commonRouter = require("./routes/commonRoutes");
const adminRouter = require("./routes/adminRoutes");
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})


const app = express();
const connectToMongo = require("./db");

const port = process.env.PORT || 5000;
connectToMongo();

app.use('/photos', express.static(path.join(__dirname, '/photos')))
//app.use('/photos', express.static('/photos'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.use(adminRouter);
app.use(userRouter);
app.use(ownerRouter);
app.use(commonRouter);



app.listen(port, () => {
    console.log("Listening on port", port)
});
