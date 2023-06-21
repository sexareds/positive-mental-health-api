import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Mongo URI 
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fwlinqy.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
// Localhost URI
// const URI = "mongodb://localhost:27017/database";

const connect = () => {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("DB is connected")
    })
    .catch((err) => {
      console.log(err)
    })
};

export default connect;