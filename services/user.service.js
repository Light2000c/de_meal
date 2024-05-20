const pool = require('../config/database');


module.exports = {
    getUserByEmail: (email, callBack) => {

        pool.query('SELECT * FROM users WHERE email=?', [email], (err, results) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results[0]);
        });
    }
}