const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
    //this makes it so that we don't need credentials in our jest testing
    credentialsRequired: process.env.NODE_ENV !== 'test',
    secret: jwtRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://noahpuckett.auth0.com/.well-known/jwks.json',
        
    }),
    audience: 'P64aiLrwXLtGZ1x0l2uHgdfSCFm0gZWG',
    issuer: 'https://noahpuckett.auth0.com',
    algorithms: ['RS256']
});
