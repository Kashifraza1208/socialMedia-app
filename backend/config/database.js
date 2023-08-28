const mongoose = require("mongoose");

const Connection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Error while connectiing database`);
  }
};

module.exports = Connection;
