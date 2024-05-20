const { Register } = require("../services/auth.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { getUserByEmail } = require('../services/user.service');
const { sign } = require('jsonwebtoken');


module.exports = {

    Login: (req, res) => {

        const data = req.body;

        if (!data.email || !data.password) {
            return res.json({
                status: "fail",
                message: "Invalid credential"
            });
        }

        try {


            getUserByEmail(data.email, (err, results) => {

                if (err) {
                    console.log(err);
                    return;
                }

                if (!results) {
                    res.json({
                        status: "fail",
                        statusText: "Invalid Login Credentials."
                    });
                }

                user_password = results.password;

                comparePassword = compareSync(data.password, user_password);

                if (!comparePassword) {
                    return res.json({
                        status: "fail",
                        statusText: "Invalid Login Credentials."
                    });
                }

                results.password = "";


                const token = sign({ result: results }, process.env.SECRET_KEY, { expiresIn: '30m' });

                return res.json({
                    status: "success",
                    ...results,
                    token: token
                });




            });


        } catch (error) {
            return res.json({
                status: "fail",
                statusText: "Internal server error"
            });
        }

    },

    Register: (req, res) => {

        const data = req.body;

        if (!data.name || !data.email || !data.password) {
            return res.json({
                status: "fail",
                message: "Invalid credential"
            });
        }

        let salt = genSaltSync(10);

        let hashed = hashSync(data.password, salt);

        data.password = hashed;

        Register(data, (err, result) => {

            if (err) {
                console.log(err);
                return;
            }


            if (result && result.affectedRows <= 0) {
                return res.json({
                    status: "fail",
                    statusText: "Registration was not successful"
                });
            }

            console.log("result ==> ", result)

            return res.json({
                status: "success",
                statusText: "Registration Successful"
            });


        });
    }
}