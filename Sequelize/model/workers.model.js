const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Model = Sequelize.Model;

class Worker extends Model {
}

module.exports = Worker.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "fullName"
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: "fullName"
    }
}, {
    underscored: true,
    sequelize: sequelize,
    modelName: 'worker'
});
