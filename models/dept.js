const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Dept = sequelize.define('dept', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    status: Sequelize.INTEGER,

});

module.exports = Dept;

