//ADD BCRYPT FOR HASH THE PASSWORD
const bcrypt = require('bcrypt');

//ADD JSONWEBTOKEN FOR THE TOKEN
const jwt = require('jsonwebtoken');

//RECOVERY USER OF MODELS
const User = require('../models/User');

//SIGNUP NEW ACOUNT
exports.signup = (req, res, next) => {
    //ADD HASH FOR CRYPT THE PASSWORD
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        //CREATE A NEW USER
        const user = new User({
          email: req.body.email,
          password: hash
        });
        //PASSWORD VALIDATOR
        var passwordValidator = require('password-validator');
          //CREATE A SCHEMA
          var schema = new passwordValidator();
          //ADD PROPERTIES TO IT
          schema
          .is().min(8)                                    // Minimum length 8
          .is().max(100)                                  // Maximum length 100
          .has().uppercase()                              // Must have uppercase letters
          .has().lowercase()                              // Must have lowercase letters
          .has().digits(2)                                // Must have at least 2 digits
          .has().not().spaces()                           // Should not have spaces
          .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

          //VALIDATE AGAINST A PASSWORD STRING
          console.log(schema.validate('validPASS123'));
          // => true
          console.log(schema.validate('invalidPASS'));
          // => false

          //GET A FULL LIST OF RULES WHICH FAILED
          console.log(schema.validate('joke', { list: true }));
          
        //SAVE THE USER IN DATA
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })

      //IF THE USER EXIST
      .catch(error => res.status(500).json({ error }));
  };

  //LOGIN WITH ACOUNT
  exports.login = (req, res, next) => {
    //FIND THE USER WITH EMAIL
    User.findOne({ email: req.body.email })
      .then(user => {
        //IF THE USER NOT FIND RECOVERY STATUS 401
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //COMPARE THE HASH FOR KNOW HAD THE STRING ORIGIN
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            //IF THE USER DON'T HAD ACOUNT OR THE PASSWORD IS BAD
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect ou utilisateur non enregistré' });
            }
            //IF THE USER EXIST
            res.status(200).json({
              userId: user._id,
              //RECOVERY TOKEN
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          //IF ELSE RECOVERY A STATUS 500
          .catch(error => res.status(500).json({ error }));
      })
      //IF ELSE RECOVERY A STATUS 500
      .catch(error => res.status(500).json({ error }));
  };