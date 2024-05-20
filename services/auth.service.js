const pool = require("../config/database");


module.exports =  {
    Register: (data, callBack) => {

        pool.query('INSERT INTO users(name,email,password) VALUES(?,?,?)', [data.name, data.email, data.password], (err, result) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, result);
        });
    }
}