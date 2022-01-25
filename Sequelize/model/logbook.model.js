const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const Model = Sequelize.Model;

const Worker = require('./workers.model');
const Work = require('./works.model');

class Logbook extends Model {
}

module.exports = Logbook.init({
    salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    workingHours: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: "08:00:00",
    },
    work_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: Work,
            key: "id",
        },
    },
    worker_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: Worker,
            key: "id",
        },
    }
}, {
    freezeTableName: true,
    underscored: true,
    sequelize: sequelize,
    modelName: 'logbook',
});

Work.belongsToMany(Worker, {through: Logbook});
Worker.belongsToMany(Work, {through: Logbook});
