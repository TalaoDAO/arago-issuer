const redis = require("redis");

const client = redis.createClient();
client.connect().then();

module.exports = client
