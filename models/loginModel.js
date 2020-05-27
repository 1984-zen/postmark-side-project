const { Users } = require('../connection_db');

module.exports = function checkLogin(users) {
    let result = {};
    function makeToken(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    return new Promise(async (resolve, reject) => {
        let checkUser = await Users.findOne({ where: { account: users.account, password: users.password } })
        if (!checkUser) {
            result.msg = "請輸入正確的帳號或密碼。"
            reject(result)
            return;
        } else {
            const api_token = makeToken(20);
            await Users.update({ api_token: api_token }, { where: { id: checkUser.id } })
            result.status = "登入成功";
            resolve(result)
        }

    });
}