const stampModelCreate = require('../models/stampModel');
const fs = require('fs');

module.exports = class Stamp {
    postStamp(req, res, next) {
        const newPath = `public/images/upload/${req.file.originalname}`;
        const stamp = {
            imgPath: `/images/upload/${req.file.originalname}`,
            stampName: req.body.stampName,
            location_id: req.body.location_id,
            user_id: req.user.id,
            create_time: onTime(),
            update_time: onTime()
        }
        fs.rename(req.file.path, newPath, (err) => {
            if (err) throw err;
            stampModelCreate(stamp)
                .then(result => {
                    res.json({
                        status: "upload successfully",
                        result: result
                    })
                })
        })
    }
}
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}