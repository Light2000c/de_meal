const multer = require('multer');
const path = require("path");
const { GetProducts, GetProductById, CreateProduct, UpdateProduct, UpdateProductWithoutImage, DeleteProduct } = require('../../services/product.service');
const User = require('../../models/user');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }
}).single("image");

const updateUpload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }
}).single("image");


module.exports = {

    GetProducts: (req, res) => {

        try {
            GetProducts((err, results) => {

                if (err) {
                    console.log(err);
                    return res.json({
                        status: "fail",
                        statusText: "Internal Server Error"
                    });
                }

                // if(!results){}

                return res.json({
                    status: "success",
                    data: results
                });
            });
        } catch (err) {
            console.log(err);
            return res.json({
                status: "fail",
                statusText: "Internal Server Error.",
            });
        }

    },



    GetProductById: (req, res) => {

        const id = req.params.id;

        try {
            GetProductById(id, (err, results) => {

                if (err) {
                    console.log(err);
                    return res.json({
                        status: "fail",
                        statusText: "Internal Server Error."
                    });
                }

                if (!results) {
                    return res.json({
                        status: "fail",
                        statusText: "Product not found."
                    });
                }

                return res.json({
                    status: "success",
                    data: results
                });


            });

        } catch (err) {
            console.log(err);
            return res.json({
                status: "fail",
                statusText: "Internal Server Error."
            });
        }


    },


    CreateProduct: (req, res) => {


        try {

            upload(req, res, async function (err) {

                let data = req.body;

                // console.log(data);

                if (!data.name || !data.price || !data.category || !data.description || !data.user_id) {
                    return res.json({
                        status: "fail",
                        statusText: "Invalid data was sent in the request."
                    });
                }

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



                if (err instanceof multer.MulterError) {
                    // A Multer error occurred during file upload
                    return res.status(400).json({ error: err.message });
                }


                if (err) {
                    console.log(err);
                    return res.json({
                        status: fail,
                        statusText: "Something went wrong. please try again later."
                    });
                }


                if (req.file == undefined) {
                    console.log(err);
                    return res.json({
                        status: "fail",
                        statusText: "Could not find file"
                    });
                }

                data.image = req.file.filename;

                CreateProduct(data, (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.json({
                            status: "fail",
                            statusText: "Internal Server Error"
                        });
                    }

                    if (result && result.affectedRows <= 0) {
                        return res.json({
                            status: "fail",
                            statustext: "Product was not successfully added."
                        });
                    }

                    return res.json({
                        status: "success",
                        statusText: "Product have been successfully added."
                    });
                });



            });

        } catch (error) {
            console.log(error);
            return res.json({
                status: "fail",
                statusText: "Internal Server Error"
            });
        }


    },



    UpdateProduct:  (req, res) => {

        try {

          updateUpload(req, res, async function (err) {

                let data = req.body;

                // console.log(data);

                if (!data.name || !data.price || !data.category || !data.description || !data.id || !data.user_id) {
                    return res.json({
                        status: "fail",
                        statusText: "Invalid data was sent in the request."
                    });
                }

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



                if (err instanceof multer.MulterError) {
                    // A Multer error occurred during file upload
                    return res.status(400).json({ error: err.message });
                }


                if (err) {
                    console.log(err);
                    return res.json({
                        status: fail,
                        statusText: "Something went wrong. please try again later."
                    });
                }


                if (req.file == undefined) {

                    UpdateProductWithoutImage(data, (err, result) => {

                        if (err) {
                            console.log(err);
                            return res.json({
                                status: "fail",
                                statusText: "Internal Server Error"
                            });
                        }


                        if (result && result.affectedRows <= 0) {
                            return res.json({
                                status: "fail",
                                statustext: "Product was not successfully updated."
                            });
                        }

                        return res.json({
                            status: "success",
                            statusText: "Product have been successfully updated."
                        });
                    });

                } else {

                    data.image = req.file.filename;

                    console.log(data.image)

                    UpdateProduct(data, (err, result) => {

                        if (err) {
                            console.log(err);
                            return res.json({
                                status: "fail",
                                statusText: "Internal Server Error"
                            });
                        }

                        if (result && result.affectedRows <= 0) {
                            return res.json({
                                status: "fail",
                                statustext: "Product was not successfully updated."
                            });
                        }

                        return res.json({
                            status: "success",
                            statusText: "Product have been successfully updated."
                        });
                    });
                }


            });

        } catch (error) {
            console.log(error);
            return res.json({
                status: "fail",
                statusText: "Internal Server Error"
            });
        }

    },

    DeleteProduct: async (req, res) => {

       let data = req.body;

        if(!data.id || !data.user_id){
            return res.status(400).json({
                status: "fail,",
                statusText: "Invalid data was sent in the request."
            });
        }

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
      

        try{

        DeleteProduct(data.id, (err, results) => {

            if(err){
                console.log(err);
                return 
            }

            if(results && results.affectedRows <= 0){
                return res.json({
                   status: "fail",
                   statusText: "Product not found.", 
                });
            }

            return res.json({
                status: "success",
                statusText: "Product has been successfully deleted"
            });

        });

    }catch(error){
        console.log(error);
        return res.json({
            status: "fail",
            statusText: "Internal server error."
        });
    }

    }

}