import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
