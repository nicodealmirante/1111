const MockAdapter = require("@bot-whatsapp/database/");

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const adapterDB = new MongoAdapter({
  dbUri: MONGO_DB_URI,
  dbName: MONGO_DB_NAME,
});

module.exports = { adapterDB };
