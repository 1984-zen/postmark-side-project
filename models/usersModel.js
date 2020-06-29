const { Users } = require('../connection_db');
const { onTime } = require('./onTimeModel');

async function checkAccount(payload) {
    const hasAccount = await Users.findOne({
        where: {
            account: payload.account
        },
        attributes: ['id']
    })
        .then(hasAccount => {
            if (hasAccount) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            let obj = new Error("ORM checkAccount error");
            obj.status_code = 500;
            obj.err = err.message;
            throw obj;
        })
    return hasAccount;
}
async function regist(payload) {
    try {
        registResult = await Users.create({
            account: payload.account,
            password: payload.password,
            name: payload.name,
            create_time: onTime(),
            update_time: onTime()
        })
            .then(registResult => {
                return [
                    {
                        message: "registed one user",
                        datas: registResult
                    },
                    {
                        status_code: 201
                    }
                ]
            })
            .catch(err => {
                let obj = new Error("ORM regist error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return registResult;
    } catch (err) {
        throw err;
    }
}
async function modifyProfile(payload) {
    try {
        async function modify() {
            if (payload.headImg === false) {
                const isModify = await Users.update(
                    {
                        password: payload.password,
                        name: payload.name,
                    },
                    {
                        where: {
                            id: payload.userID
                        }
                    }
                )
                return isModify
            } else {
                const isModify = await Users.update(
                    {
                        password: payload.password,
                        name: payload.name,
                        head_img: payload.headImg
                    },
                    {
                        where: {
                            id: payload.userID
                        }
                    }
                )
                return isModify
            }
        }
        const result = await modify().then(([isModify]) => {
            if (isModify === 0) {
                return [
                    {
                        message: "nothing changed"
                    },
                    {
                        status_code: 200
                    }
                ]
            } else {
                return [
                    {
                        message: "something changed",
                        password: payload.password,
                        name: payload.name,
                        head_img: payload.headImg
                    },
                    {
                        status_code: 201
                    }
                ]
            }
        })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return result;
    } catch (err) {
        throw err;
    }
}
async function getProfile(userID) {
    try {
        const profile = await Users.findAll({
            where: {
                id: userID
            },
            attributes: ['id', 'name', 'head_img']
        })
            .then(([profile]) => {
                return [
                    {
                        message: "get one profile",
                        id: profile.dataValues.id,
                        name: profile.dataValues.name,
                        headImg: profile.dataValues.head_img
                    },
                    {
                        status_code: 200
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return profile;
    } catch (err) {
        throw err;
    }
}
async function checkUser(payload) {
    const userDatas = await Users.findOne({
        where: {
            account: payload.account,
            password: payload.password,
        },
        attributes: ["id"],
    });
    if (!userDatas) {
        return false;
    } else {
        return userDatas.dataValues.id;
    }
}
function makeToken(length) {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
async function updateUserToken(updatePayload) {
    const result = await Users.update(
        {
            api_token: updatePayload.api_token,
        },
        {
            where: {
                id: updatePayload.userID,
            },
        }
    );
    if (!result) {
        return false;
    } else {
        return true;
    }
}
async function checkLogin(payload) {
    try {
        const hasUser = await checkUser(payload);
        if (hasUser === false) {
            throw new Error("account or password incorrected");
        }
        const api_token = makeToken(20);
        const updatePayload = {
            userID: hasUser,
            api_token: api_token,
        };
        const updateResult = await updateUserToken(updatePayload);
        if (updateResult === false) {
            throw new Error("update user api_token faliled");
        }
        const result = await Users.findOne({ where: { id: updatePayload.userID } });
        return result;
    } catch (err) {
        console.log("===post user login was error: ", err);
        throw new Error(err.message);
    }
}

module.exports = {
    checkLogin, getProfile, modifyProfile, regist, checkAccount
};
