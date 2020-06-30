const { Users } = require('../connection_db')

exports.AdminAuth = async function verifyAdmin(req, res, next) {
    const checkAdminNull = await Users.findOne({
        where: { id: req.user.id }
    });
    if (checkAdminNull.is_admin === 0) {
        res.json({
            message: `apitoken is not administrator`,
            error: {
                isAdmin: `false`
            }
        })
        return;
    } if (checkAdminNull.is_admin === 1) {
        next();
    }
}