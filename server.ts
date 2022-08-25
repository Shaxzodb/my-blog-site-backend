import express from "express"; // import express
import morgan from "morgan"; // Morgan is a logger middleware for Express.
import helmet from "helmet"; // Helmet helps you secure your Express apps by setting various HTTP headers.
import compression from "compression"; // gzip compression

import cors from "cors"; // cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

const app = express(); // create an express application
import router from "./routes/router"; // import the router


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(compression()); // for compressing response bodies

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // for logging requests
  
}else {
  app.use(helmet()); // for logging and security
  app.enable("trust proxy"); // trust proxy is a method of express that allows you to set the value of req.ips to the IP address of the proxy that connected to your app.
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  });
}
const corsOptions = {
  origin: "http://okian.uz",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); // for cors
app.use(router); // for routing requests

const PORT = process.env.PORT || 8000; // for setting port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}).on("error", (err) => {
  console.log(err); // for error handling
}); // for starting server
