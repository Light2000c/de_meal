const pool = require("../config/database")


module.exports = {

    getCart: (callBack) => {

        pool.query("SELECT * FROM carts", (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }


            return callBack(null, results)
        });
    },

    getCartById: (id, callBack) => {

        pool.query("SELECT * FROM carts WHERE id=?", [id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results[0])
        });
    },

    getUserCarts: (userId, callBack) => {

        // pool.query("SELECT * FROM carts WHERE user_id=?", [userId], (err, results) => {
        pool.query("SELECT carts.*,products.* FROM carts JOIN products ON carts.product_id = products.id", [userId], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    createCart: (data, callBack) => {

        pool.query("INSERT INTO carts (user_id, product_id, quantity) VALUES(?,?,?)", [data.user_id, data.product_id, data.quantity], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }


            return callBack(null, results)
        })
    },

    updateCart: (data, callBack) => {

        pool.query("UPDATE carts SET quantity=? WHERE id=?", [data.quantity, data.id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    deleteCart: (id, callBack) => {

        pool.query("DELETE FROM carts WHERE id=?", [id], (err, results) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    }
}