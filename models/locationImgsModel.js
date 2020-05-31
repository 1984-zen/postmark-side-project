const { Location_imgs } = require('../connection_db');

async function stampCreate(stamp) {
    let result = {};
    result.message = `upload stamp successfully`;
    result.result = stamp;
    let stampResult = await Location_imgs.create({
        name: stamp.name,
        img_url: stamp.img_url,
        locationId: stamp.location_id,
        create_time: stamp.create_time,
        update_time: stamp.update_time
    })
    result.location_img_id = stampResult.id;
    return result;
}

module.exports = {
    stampCreate
}