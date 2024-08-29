import { ENV_VARS } from "./config/envVars.js";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const port = ENV_VARS.PORT;

connectDB()
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((err) => console.log("MongoDB connection error: ", err));
