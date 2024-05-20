const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
})

const User = sequelize.define('users', {}, {
    timestamps: false,
});

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

User.getUserById = async function (userId) {
    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'is_admin']
        });
        return user;
    } catch (error) {
        // throw new Error('Error retrieving user by ID');
        console.log(error);
    }
}

module.exports = User;