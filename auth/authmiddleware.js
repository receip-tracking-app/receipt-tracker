const JWT = require('jsonwebtoken');
const secrets = require('./secrets');



module.exports = (req,res,next) => {

    const tokenHeader = req.headers.authorization;
        console.log('req.headers.authorization', req.headers.authorization);
        if(tokenHeader){
            const tokenStrings = tokenHeader.split(" ");
            if(tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[1]){
                JWT.verify(tokenStrings[1], secrets.jwtSecret, (err, decodedToken) => {
                    if(err){
                        res.status(401).json({
                            message: "err verifing token",
                            error: err
                        });
                    }else{
                        req.decodedJwt = decodedToken;
                        next();
                    }
                });
            }else{
                res.status(401).json({
                   message: "invalid scheme name or no token after scheme name",
                });
            }
        }else{
            res.status(401).json({message: 'missing Authorization header'});
        }

};