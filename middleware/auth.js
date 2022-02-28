//RECOVERY JSONWEBTOKEN
const jwt = require('jsonwebtoken');

//SECURTY
module.exports = (req, res, next) => {
  try {
    //RECOVERY THE TOKEN IN THE HEADERS AUTHORIZATION DANS RECOVERY THE 2ND ELEMENT OF ARRAY
    const token = req.headers.authorization.split(' ')[1];
    //VERIFY THE TOKEN IS DECODED WITH THE SECRET KEY, THE KEY MUST MATCH
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //VERIFY THE USERID IS SEND WITH THE REQUEST MATCH OF USERID ENCODED IN THE TOKEN
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: error('Invalid request!')
    });
  }
};