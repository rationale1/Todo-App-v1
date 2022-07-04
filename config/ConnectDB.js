const { connect } = require("mongoose"),
  { MONGO_URL, MONGO_URL_LOCAL, MONGO_URL_2 } = require("./keys"),
  { success, error } = require("consola");

const PORT = process.env.PORT || 5000;

const connectDB = async app => {
  try {
    await connect(MONGO_URL_2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    success({ message: `Connected to MongoDB...`, badge: true });

    app.listen(PORT, () => {
      success({ message: `Server started on port ${PORT}`, badge: true });
    });
  } catch (err) {
    error({ message: `Unable to Connect to database: ${err}`, badge: true });

    process.exit(1);
  }
};

module.exports = connectDB;
