const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const dotenv = require("dotenv");

const usersRouter = require("./routes/api/auth");
const tasksRouter = require("./routes/api/tasks");
const reviesRouter = require("./routes/api/reviews");
// TODO delete
const testDataRoutes = require("./routes/api/testData");

dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/tasks", tasksRouter);
app.use("/api/revies", reviesRouter);
// TODO delete
app.use("/api/test_data", testDataRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
