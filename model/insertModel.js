const db = require("../config/db");
const addEnterQuery = "INSERT INTO basic_table(uuid, type, send_user, data, date) VALUES(?, ?, ?, ?, ?) ";

const getnickNameQuery = "SELECT nick_name FROM user WHERE phone_num = ?";

class insertModel{
    static addEnter(uuid, date, userid, usernickname) {
        return new Promise((resolve, reject) => {
            db.chatdb.query(addEnterQuery, [uuid, "Enter", 12, usernickname + "님이 참가하셨습니다.",date], (err,data) => {
                if(err) reject(err);
                resolve(true);
            });
        });
    }

}
module.exports = insertModel;
