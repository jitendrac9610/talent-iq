import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(ENV.PORT || 3000, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
