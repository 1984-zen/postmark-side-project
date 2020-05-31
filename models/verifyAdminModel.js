const { Users } = require('../connection_db')

exports.AdminAuth = async function verifyAdmin(req, res, next) {
    const checkAdminNull = await Users.findOne({
        where: { id: req.user.id }
    });
    console.log(checkAdminNull)
    if (checkAdminNull.isAdmin === 0) {
        res.json({
            message: `is not administrator`,
            error: {
                isAdmin: `false`
            }
        })
        return;
    } if (checkAdminNull.isAdmin === 1) {
        next();
    }
}