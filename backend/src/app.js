require("dotenv").config();
const express = require("express");
const cors = require("cors");



const projectsRoutes = require("./routes/projects.routes");
const resumeRoutes = require("./routes/resume.routes");
const localUserRoutes = require("./routes/user.routes");

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://windows-portfolio-kappa.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
})); 
app.use(express.json());

app.use("/api/projects", projectsRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/user", localUserRoutes);

app.get("/", (req, res) => {
  res.send("Hello from MyWindows API");
});

module.exports = app;