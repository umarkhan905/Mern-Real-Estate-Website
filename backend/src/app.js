import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

export { app };
