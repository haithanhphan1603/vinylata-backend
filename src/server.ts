import app from "./index";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose.connect(DB).then(() => {
    console.log("DB connection successful");
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
