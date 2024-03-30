const express = require("express");
const app = express();
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const { trace } = require("./public/routes");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/routes"));
app.listen(3000, async () => {
  try {
    await prisma.$connect();
    console.log("Server running on port 3000 and connected to database");
  } catch (error) {
    console.error("Error connecting to database");
  }
});
