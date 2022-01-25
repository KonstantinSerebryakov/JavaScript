const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Model = Sequelize.Model;

class Work extends Model {
}

module.exports = Work.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    underscored: true,
    sequelize: sequelize,
    modelName: 'work'
});
