const { Locations, Posts, User_postmarks } = require('../../connection_db');
const { getLocationPosts } = require('../../models/locationsModel');
const { checkLocationID } = require('../../models/locationsModel');

async function showLocationPosts(req, res, next) {
    Locations.hasMany(Posts, { foreignKey: 'location_id' })
    Posts.hasMany(User_postmarks, { foreignKey: 'post_id' })
    try {
        const locationID = req.params.id;
        const haslocation = await checkLocationID(locationID)
        if (haslocation === false) {
            throw {
                message: {
                    message: "this location id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await getLocationPosts(locationID);
        res.status(status_code.status_code)
        res.json({
            status: "get posts from location successfully",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get posts from location failed",
            result: err.message
        })
        console.log(err.stack)
    }
}

module.exports = {
    showLocationPosts
}