const { Users } = require("../connection_db");

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
async function profileShow(userID) {
    return Users.findOne({
        where: {
            id: userID,
        },
    });
}

module.exports = {
    checkLogin,
    profileShow,
};
