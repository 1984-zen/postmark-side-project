const { Users } = require('../connection_db');

module.exports = function toRegister(users) {
    let result = {}
    return new Promise(async (resolve, reject) => {
        await Users.create({ account: users.account, password: users.password, update_time: users.update_time, create_time: users.create_time })
        if (err) {
            console.log(err);
            result.status = "註冊失敗。";
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
        }
        result.status = "註冊成功。";
        result.regist_info = users;
        resolve(result)
    })
}