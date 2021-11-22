import express from "express";
import cors from "cors";
import auth from "./middlewares/auth.js";
import signup from "./controllers/signup.js";
import login from "./controllers/login.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", signup);
app.post("/login", login);

export default app;
