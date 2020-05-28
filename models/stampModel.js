const { Stamps } = require('../connection_db')

module.exports = function stampModelCreate(stamp) {
    let result = {};
    return new Promise(async (resolve, reject) => {
        await Stamps.create({ name: stamp.stampName, img_url: stamp.imgPath, location_id: stamp.location_id, user_id: 1, create_time: stamp.create_time, update_time: stamp.update_time })
        result.img_info = stamp
        resolve(result)
    });
}