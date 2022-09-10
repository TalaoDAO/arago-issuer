const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    if (token === 'null') {
        return res
            .status(401)
            .json({
                message: 'Authorization failed.',
                success: false,
            }) //401 -> not authorised
    }

    try {
        req.user = jwt.verify(token, config.get('ACCESS_TOKEN_SECRET'))
        next()
    } catch (err) {
        res.status(401).json({message: 'Authorization failed.', success: false})
    }
}
