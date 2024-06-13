const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const catalogServiceRouter = require("./src/service/catalog");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/gateway", catalogServiceRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
