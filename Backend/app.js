const express = require("express");
const app = express();
const server = require("./util/server");
const route = require("./routers/registration");
const multer = require('multer');
const cors=require('cors');

// const multer=require('multer');
var bodyParser = require('body-parser')
const HOST = '0.0.0.0';

app.use(cors());
const path = require('path');
const fs = require('fs');


const uploadDir = path.join(__dirname, './uploads/');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api",route);


// app.use("/ankit",(req,res) => {
//     return res.send("HEllo Ankit...");
// })

const port = server.rootServer;

app.listen(port,HOST, () => {
    console.log(`Root Server Start on ${port}`);
});
