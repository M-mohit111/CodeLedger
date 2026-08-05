const redis = require('redis');

const redisclient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'giraffe-majestic-vespertine-44538.db.redis.io',
        port: 18112
    }
});

module.exports = redisclient