module.exports = (req, res, next) => {
    req.user = {
        sub: '1234'
    };
    next();
};
