const { Stamps } = require('../connection_db')

function stampModelShowLimit6(userID) {
    return Stamps.findAll(
        {
            where: {
                user_id: userID
            },
            limit: 6,
        }
    )
}
function stampModelCreate(stamp) {
    let result = {};
    return new Promise(async (resolve, reject) => {
        await Stamps.create({ name: stamp.stampName, img_url: stamp.imgPath, location_id: stamp.location_id, user_id: 1, create_time: stamp.create_time, update_time: stamp.update_time })
        result.img_info = stamp
        resolve(result)
    });
}
function stampModelDelete(deleteStampID) {
    let result = {};
    return new Promise(async (resolve, reject) => {
        checkID = await Stamps.findOne({ where: { id: deleteStampID } })
        if (!checkID) {
            result.err = `id ${deleteStampID} is not exist`
            reject(result)
        } else {
            result.msg = `deleted stamp id ${deleteStampID} successfully`;
            resolve(result)
        }
    })
}

module.exports = {
    stampModelCreate, stampModelDelete, stampModelShowLimit6
}