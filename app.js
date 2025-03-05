const express = require("express");
const app = express();
const server = require("./util/server");
const route = require("./routers/registration");

app.use(express.json()); 
app.use("/", route);

const port = server.rootServer;

app.listen(port, () => {
    console.log(`Root Server Start on ${port}`);
});
