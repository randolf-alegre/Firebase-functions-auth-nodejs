const admin = require('firebase-admin');

exports.authenticate = async(req, res, next) => {
    try {
        const headerBearer = req.headers['authorization'];

        if(headerBearer){
            const bearer = headerBearer.split(' ');
            if(bearer.length == 2) {  // It should have bearer word.
                const token = bearer[1];

                const decodedToken = await admin.auth().verifyIdToken(token);
                
                if(decodedToken){

                    req.user = { 
                        uid: decodedToken.uid, 
                        email_verified: decodedToken.email_verified,
                        email: decodedToken.email
                    }
                    next(req, res);

                }else{
                    res.status(403).json({
                        status: 403,
                        message: `Forbidden: You have no access to this point.`
                    });
                    return false;
                }
            }else{
                res.status(403).json({
                    status: 403,
                    message: `Forbidden: Bearer token is required.`
                });

                return false;
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}