require("dotenv").config();

const Routes = require("./src/routes/routes");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", new Routes().loadRoutes());

app.listen(4000);
