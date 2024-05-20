const { GetProducts, GetProductById } = require("../../services/product.service"); 

module.exports = {

    GetProducts: (req, res) => {

        GetProducts((err, results) => {

            if(err){
                console.log(err);
                return res.json({
                    status: "fail",
                    statusText: "Internal serve error"
                });
            }

            if(!results){
                return res.json({
                    status: "fail",
                    statusText: "Something went wrong, please try again later."
                });
            }

            return res.json({
                status: "success",
                data: results
            });

        });
    },

    GetProductById: (req, res) => {

        const id = req.params.id;

        GetProductById(id, (err, results) => {

            if(err){
                console.log(err);
                return res.json({
                    status: "fail",
                    statusText: "Internal server error"
                });
            }

            if(!results){
                return res.json({
                    status: "fail",
                    statusText: "Product not found."
                })
            }

            return res.json({
                status: "success",
                data: results
            });
        });
    }

};