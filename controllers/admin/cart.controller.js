const { getCart, getCartById,  deleteCart } = require("../../services/cart.service");
const User = require('../../models/user');


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



    DeleteCart: async (req, res) => {
        const id = req.body.id;

        const user = await User.getUserById(data.user_id);

        // console.log("user ==>", user);

        if(!user || !user.dataValues){
            return res.json({
                status: "fail",
                statusText: "Invalid user making the request."
            });
        }

        if(user.dataValues.is_admin != 1){
            return res.json({
                status: "fail",
                statusText: "User doesn't have permission to make request."
            });
        }

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