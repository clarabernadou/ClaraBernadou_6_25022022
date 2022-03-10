const Thing = require('../models/thing');

//CREATE A SAUCE
exports.createThing = (req, res, next) => {
  const things = JSON.parse(req.body.sauce)
  delete things._id
  const thing = new thing({
    ...things,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});

//SAVE THE SAUCE
thing.save().then(
    () => {
      res.status(201).json({ message: 'Post saved successfully!' });
    }
//IF ELSE
).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

//FIND A SAUCE
exports.getOneThing = (req, res, next) => {
Thing.findOne({ _id: req.params.id })
.then(
    (thing) => {
      res.status(200).json(thing);
})
//IF ELSE
.catch(
    (error) => {
      res.status(404).json({ error: error });
    }
);
};

//MODIFY THE SAUCE
exports.modifyThing = (req, res, next) => {
const thing = req.file ? 
{
  ...JSON.parse(req.body.sauce),
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

} : { ...req.body }
//SAVE THE MODIFICATIONS
Thing.updateOne(
  { _id: req.params.id }, { ...thing, _id: req.params.id })
.then(
  () => 
    res.status(201).json({ message: 'Thing updated successfully!' })
//IF ELSE
).catch(
  error => 
    res.status(400).json({ error: error }))
}
//DELETE THE SAUCE
exports.deleteThing = (req, res, next) => {
Thing.findOne({_id: req.params.id})
  .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, () => {
      thing.deleteOne({ _id: req.params.id })
      .then(
        () => res.status(200).json({ message: 'SAUCE DELETED !' }))
      .catch(
        error => 
          res.status(400).json({ error: error }))
      })
    }

//IF ELSE
).catch(
  error => 
    res.status(500).json({ error }))
}

//FIND A LIST OF SAUCES
exports.getAllStuff = (req, res, next) => {
  Thing.find()
  .then(
    (things) => {
      res.status(200).json(things);
    }
//IF ELSE
).catch(
  (error) => {
    res.status(400).json({ error: error });
  }
);
};

//LIKE OR DISLIKE
exports.likeOrNot = (req, res, next) => {
  if (req.body.like === 1) {
      Thing.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
          .then((thing) => res.status(200).json({ message: 'Add like' }))
          .catch(error => res.status(400).json({ error }))
  } else if (req.body.like === -1) {
    Thing.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
          .then((thing) => res.status(200).json({ message: 'Add dislike' }))
          .catch(error => res.status(400).json({ error }))
  } else {
Thing.findOne({ _id: req.params.id })
  .then(thing => {
    if (thing.usersLiked.includes(req.body.userId)) {
    Thing.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
      .then(
        (thing) => { 
          res.status(200).json({ message: 'Like deleted' }) })
//IF ELSE
.catch(
  error => res.status(400).json({ error }))
} else if (thing.usersDisliked.includes(req.body.userId)) {
  Thing.updateOne(
    { _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
      .then(
        (thing) => { 
          res.status(200).json({ message: 'Dislike deleted' }) })
//IF ELSE
.catch(
  error => 
    res.status(400).json({ error }))
        }
  })
//IF ELSE
.catch(
  error => 
    res.status(400).json({ error }))
  }
}