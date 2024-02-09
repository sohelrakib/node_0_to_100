const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node_0_100', 'root', 'P@ssw0rd', {
        dialect: 'mysql',
        host: '127.0.0.1'
    }
);

module.exports = sequelize;