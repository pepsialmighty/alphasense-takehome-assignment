import mongoose from "mongoose";

const dbConnect = async () => {
  const connectionString = "mongodb://mongo:27017/alphasense";

  try {
    await mongoose.connect(connectionString);
    console.log("Database connect sucessfully");
  } catch (error) {
    console.log("Database error");
  }
};

export default dbConnect;
