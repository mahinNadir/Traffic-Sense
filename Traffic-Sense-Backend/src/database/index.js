const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
  try {
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect(process.env.MONGODB_URI, options);

    return connection;
  } catch (err) {
    throw new Error("Failed to connect to MongoDB");
  }
};

const dbConnection = connectToMongoDB();

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed");
    process.exit(0);
  } catch (err) {
    console.error(`Error closing Mongoose connection: ${err}`);
    process.exit(1);
  }
});

module.exports = dbConnection;