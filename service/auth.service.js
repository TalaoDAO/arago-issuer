const config = require('config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const client = require('../helpers/redis-client');

const findUser = async (userId) => {
  const users = await client.lRange(config.get('REDIS_KEY'), 0, -1);
  const userIndex = users.findIndex((item) => {
    return JSON.parse(item).id === userId;
  });

  if (userIndex === -1) return null;

  return {
    user: JSON.parse(users[userIndex]),
    queueUserIndex: userIndex
  };
};

const checkExpiration = (user) => {
  const diff = moment().diff(moment(user.date_time), 'minutes');

  return diff > 3;
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get('ACCESS_TOKEN_SECRET'), { expiresIn: '15m' });
};

module.exports = {
  checkExpiration,
  findUser,
  generateAccessToken,
}
