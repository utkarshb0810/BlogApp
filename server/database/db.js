import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@blog-app.wdw2zba.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("database connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};

export default Connection;
