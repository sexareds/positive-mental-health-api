import mongoose from "mongoose";

const connect = () => {
  mongoose.connect(process.env.MONGOD_URI, {
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