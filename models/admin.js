const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Admin = sequelize.define('admin', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    // email: Sequelize.STRING,

    email: {
        type: Sequelize.STRING,
        unique: true // this makes the email field unique
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
}, {
    timestamps: false
});

module.exports = Admin;

