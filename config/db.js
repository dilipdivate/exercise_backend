const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(
          `MongoDB Connected: ${data.connection.host} ${data.connection.port}`
        );
      })
      .catch((error) => {
        console.log(error.code);
        console.log('Dilip Error', error);
      });
  } catch (error) {
    console.log(error.code);
    console.log('Dilip Error 2', error);
  }
};

module.exports = connectDB;
