const { Location_imgs } = require('../connection_db');

exports.checkAdminStamp = async function (req, res, next) {
    const checkNull = await Location_imgs.findAll(
        {
            where: { id: req.params.id }
        }
    )
    if (checkNull.length === 0) {
        res.json({
            message: `stamp id does not exist`,
            error: {
                stamp_id: req.params.id
            }
        })
        return;
    } else {
        next();
    }
}