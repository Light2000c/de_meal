const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
})

const Cart = sequelize.define('carts', {}, {
    timestamps: false,
});


Cart.getCartById = async function (cartId) {
    try {
        const user = await Cart.findByPk(cartId, {
            attributes: ['user_id', 'product_id', 'quantity', 'created_at']
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}


Cart.userHasCart = async function (userId, productId) {

    try {
        const userCarts = await Cart.findAll({
            where: {
                user_id: userId,
                product_id: productId
            }
        });


        // console.log("length => ", userCarts.length);
        return userCarts.length > 0;
    } catch (error) {
        console.log(error);
    }
}



module.exports = Cart;