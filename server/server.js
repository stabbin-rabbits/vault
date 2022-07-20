const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const transactionRouter = require("./routes/transactions.js");
const loginRouter = require("./routes/loginRouter.js");
const signupRouter = require("./routes/signupRouter.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client")));

// router for transactions 
// app.use("/transactions", transactionRouter);

// router for login
// app.use("/login", loginRouter);

app.use("/signup", signupRouter);

// catch all route handler
app.use("*", (req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
