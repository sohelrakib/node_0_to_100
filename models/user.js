const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Dept = require('./dept');
const Admin = require('./admin');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   
    join_date: Sequelize.DATE,
    salary: Sequelize.DECIMAL,

    deptId: {
        type: Sequelize.INTEGER, // Assuming deptId is an integer
        allowNull: false
    },

    adminId: {
        type: Sequelize.INTEGER, // Assuming deptId is an integer
        allowNull: false
    }

}, {
    timestamps: false
});

// Define the relationship between User and Dept
User.belongsTo(Dept, { foreignKey: 'deptId' }); // A user belongs to a department
User.belongsTo(Admin, { foreignKey: 'adminId' }); // A user belongs to a admin

module.exports = User;
