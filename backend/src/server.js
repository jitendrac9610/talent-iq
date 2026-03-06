import express from "express";
import path from "path";

import { ENV } from "./lib/env.js";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDB();
});
