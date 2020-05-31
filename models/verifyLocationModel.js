const { Locations } = require('../connection_db');
exports.checkLocation = async function (req, res, next) {
    const checkNull = await Locations.findAll({ where: { id: req.params.id } });
    if (checkNull.length === 0) {
        res.json({
            message: `location id does not exist`,
            error: {
                location_id: req.params.id
            }
        })
        return;
    } else {
        next();
    }
}