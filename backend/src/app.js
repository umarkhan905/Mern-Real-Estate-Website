import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routes
import userRoute from "./routes/user.route.js";

app.use("/api/v1", userRoute);

export { app };
