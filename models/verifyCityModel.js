const { Cities } = require('../connection_db');
exports.checkCity = async function (req, res, next) {
    const checkNull = await Cities.findAll({ where: { id: req.params.id } });
    if (checkNull.length === 0) {
        res.json({
            message: `city id does not exist`,
            error: {
                city_id: req.params.id
            }
        })
    } else {
        next();
    }
}