const { getCart, getCartById, getUserCarts, createCart, updateCart, deleteCart } = require("../../services/cart.service");
const Cart = require("../../models/cart");


module.exports = {

    GetCart: (req, res) => {

        getCart((err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: "fail",
                    statusText: "Internal server error"
                });
            }

            return res.json({
                status: "success",
                data: results
            })
        })
    },

    GetCartById: (req, res) => {

        const id = req.params.id;

        getCartById(id, (err, results) => {

            if(err){
                console.log(err);
                return res.status({
                    status: "fail",
                    statusText: "Internal server error."
                });
            }

            if(!results){
                return res.json({
                    staus: "fail",
                    statusText: "cart not found."
                });
            }

            return res.json({
                status: "success",
                data: results
            });
        })
    },

    GetUserCarts: (req, res) => {

        const data = req.params;

        getUserCarts(data.user_id, (err, results) => {

            if (err) {
                console.log(err);
                return res.json({
                    status: "fail",
                    statusText: "Internal server error",
                })
            }

            if (!results) {
                return res.json({
                    status: "fail",
                    statusText: "User not found"
                });
            }

            return res.json({
                status: "success",
                data: results
            });
        });
    },

    CreateCart: async (req, res) => {

        const data = req.body;

        if (!data.user_id, !data.product_id, !data.quantity) {
            return res.json({
                status: "fail",
                statusText: "Invalid data was sent in the request"
            });
        }

        const has_cart = await Cart.userHasCart(data.user_id, data.product_id);

        if (has_cart) {
            console.log(has_cart)
            return res.json({
                status: "fail",
                statusText: "User already added product to cart"
            });
        }


        createCart(data, (err, results) => {

            if (err) {
                console.log(err);
                return res.json({
                    status: "fail",
                    statusText: "Internal server error."
                });
            }

            if (results && results.affectedRows <= 0) {
                return res.json({
                    status: "fail",
                    statusText: "Cart was not successfully added."
                });
            }

            return res.json({
                status: "success",
                statusText: "Cart has been successfully created."
            });
        });
    },

    UpdateCart: (req, res) => {
        const data = req.body;

        updateCart(data, (err, results) => {

            if(err){
                console.log(err);
                return res.json({
                    status: "fail",
                    statusText: "Internal server error."
                });
            }

                if(results && results.affectedRows <= 0){
                    return res.json({
                        staus: "fail",
                        statusText: "cart not found."
                    });
                }

                return res.json({
                    status: "success",
                    statusText: "cart has been successfully updated."
                });
          
        });
    },

    DeleteCart: (req, res) => {
        const id = req.body.id;

        deleteCart(id, (err, results) => {

            if(err){
                console.log(err);
                return
            }

            if(results && results.affectedRows <= 0){
                return res.json({
                    staus: "fail",
                    statusText: "cart not found."
                });
            }

            return res.json({
                status: "success",
                statusText: "cart has been successfully deleted."
            });
        });
    }
}