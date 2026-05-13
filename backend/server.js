import app from "./src/app.js";
import { config } from "dotenv";
import db from "./src/db/db.js";

config();
db();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
