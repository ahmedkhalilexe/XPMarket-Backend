const express = require("express");
const app = express();
const cors = require("cors");
const cookiePrser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cookiePrser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", process.env.FRONTEND_URL],
  credentials: true,
}));
const PORT = process.env.PORT || 3000;
// app.use(express.json());
app.use("/api", require("./routes/routes"));
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server running on port ${PORT} and connected to database`);
  } catch (error) {
    console.error("Error connecting to database");
  }
});