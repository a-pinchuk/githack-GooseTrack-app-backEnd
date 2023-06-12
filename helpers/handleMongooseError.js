const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  console.log("🚀 ~ name:", name, code);

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  console.log("🚀 ~ name:", name);
  error.status = status;
  next();
};

module.exports = handleMongooseError;
