const redis = require('redis');

const redisclient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'sister-smart-wizardly-14268.db.redis.io',
        port: 18291
    }
});

module.exports = redisclient