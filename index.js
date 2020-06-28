const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

// Import the routes
const viewRoute = require("./routes/view");
const mainRoute = require("./routes/main");

// Set the view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Setup the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set a static folder
app.use(express.static("public"));

// Configure the routes
app.use("/", viewRoute);
app.use("/api", mainRoute);

app.get("/*", (req, res) => {
  res.render("notfound");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listening on http://127.0.0.1:" + port));
