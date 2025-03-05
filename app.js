const express = require("express");
const app = express();
const server = require("./util/server");
const route = require("./routers/registration");
// const multer=require('multer');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json())

app.use("/",route);

// jitendrag
// singh
const port = server.rootServer;

app.listen(port, () => {
    console.log(`Root Server Start on ${port}`);
});
