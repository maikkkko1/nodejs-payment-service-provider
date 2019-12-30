require("dotenv").config();

const databaseHelper = require('./src/database/createDatabase');

databaseHelper.createDatabase();

const Routes = require("./src/routes/routes");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", new Routes().loadRoutes());

app.listen(3000);
