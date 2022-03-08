const Thing = require('../models/thing');

//CREATE A SAUCE
exports.createThing = (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
//SAVE THE SAUCE
thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
//IF ELSE
).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//FIND A SAUCE
exports.getOneThing = (req, res, next) => {
Thing.findOne({
    _id: req.params.id
}).then(
    (thing) => {
      res.status(200).json(thing);
}
//IF ELSE
).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
);
};

//MODIFY THE SAUCE
exports.modifyThing = (req, res, next) => {
const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
//SAVE THE MODIFICATIONS
Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
//IF ELSE
).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//DELETE THE SAUCE
exports.deleteThing = (req, res, next) => {
Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
//IF ELSE
).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};