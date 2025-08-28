import dotenv from "dotenv";
import { server } from "./app.js";
import { dbConnect } from "./src/db/dbconnect.js";

dotenv.config();

const PORT = process.env.PORT;

dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Error: ", error);
    });
  })
  .catch((error) => {
    console.log("Mongodb Connection Error", error);
  });
