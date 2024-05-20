const pool = require('../config/database');


module.exports = {
    GetProducts: (callBack) => {

        pool.query("SELECT * FROM products", (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results[0]);
        });
    },


    GetProductById: (id, callBack) => {

        pool.query("SELECT * FROM products where id=?", [id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results[0]);
        });
    },


    CreateProduct: (data, callBack) => {

        pool.query('INSERT INTO products (name, price, category, image, description) VALUES(?,?,?,?,?)', [data.name, data.price, data.category, data.image, data.description], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },


    UpdateProduct: (data, callBack) => {

        pool.query("UPDATE products SET name=?, price=?, category=?, image=?, description=? WHERE id=?", [data.name, data.price, data.category, data.image, data.description, data.id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },


    UpdateProductWithoutImage: (data, callBack) => {

        pool.query("UPDATE products SET name=?, price=?, category=?, description=? WHERE id=?", [data.name, data.price, data.category, data.description, data.id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    DeleteProduct: (id, callBack) => {

        pool.query("DELETE FROM products WHERE id=?", [id], (err, results) => {


        if (err) {
            console.log(err);
            callBack(err);
        }

        return callBack(null, results);
        });

    }

}