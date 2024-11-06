import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to DB: ", response.connection.host);
  } catch (error) {
    console.error("Error connecting to DB: ", error);
    process.exit(1); // stop Node process
  }
};

export default connectDB;
