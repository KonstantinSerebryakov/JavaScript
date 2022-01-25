const {Sequelize: Sequelize} = require('sequelize');

const sequelize = new Sequelize('leverx_courses', 'kostyakos52000', 'kfAhm8[xhzWX', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Sequelize has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})

module.exports = sequelize;
