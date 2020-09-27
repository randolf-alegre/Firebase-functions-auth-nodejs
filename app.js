const functions = require('firebase-functions');
const { authenticate } = require('./middleware/authentication');
const cors = require('cors')({origin: true});
const HTTP_REQUEST = functions.https;

exports.sampleEndPoint = HTTP_REQUEST.onRequest(async (req, res) => {
    try {
        cors(req, res, () => {
            authenticate(req, res, () => {
                console.log('This is the next method to call after authentication.');
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Error.'
        });
    }
});