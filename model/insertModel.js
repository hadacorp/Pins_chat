const db = require("../config/db");

const addEnterQuery = "INSERT INTO basic_table(uuid, type, send_user, data, date) VALUES(?, ?, ?, ?, ?) ";

class insertModel{
    static addEnter(uuid, user_id, user, date) {
        return new Promise((resolve, reject) => {
            db.query(addEnterQuery, [uuid, "Enter", user_id, user + "님이 참가하셨습니다.",date], (err,data) => {
                if(err) reject(err);
                resolve(data);
            });
        });
    }

}
module.exports = insertModel;
