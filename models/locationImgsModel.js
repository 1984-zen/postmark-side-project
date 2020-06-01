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
async function stampPut(stamp) {
    let result = {};
    result.message = `modify stamp successfully`;
    result.result = stamp;
    if (stamp.img_url === null) {
        const locationImgResult = await Location_imgs.findOne(
            { where: { id: stamp.stamp_id } }
        )
        result.result.img_url = locationImgResult.img_url;
        await Location_imgs.update(
            {
                name: stamp.name,
                location_id: stamp.location_id,
                update_time: stamp.update_time
            },
            { where: { id: stamp.stamp_id } }
        )
        return result;
    } else {
        await Location_imgs.update(
            {
                name: stamp.name,
                img_url: stamp.img_url,
                location_id: stamp.location_id,
                update_time: stamp.update_time
            },
            { where: { id: stamp.stamp_id } }
        )
    }
    return result;
}
async function stampDelete(stampID) {
    let result = {};
    result.message = `delete stamp successfully`;
    await Location_imgs.destroy({
        where:
        {
            id: stampID
        }
    })
    result.delete_id = stampID
    return result;
}

module.exports = {
    stampCreate, stampDelete, stampPut
}