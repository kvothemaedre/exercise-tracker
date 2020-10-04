const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model.js');

//get all exercises 
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

//add exercises
router.post('/add', async (req, res) => {
    const newExercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: Date.parse(req.body.date)
    });
    try {
        await newExercise.save();
        res.json('exercise added');
    } catch (err) {
        res.json({ message: err });
    }
})

//get specific exercise
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});


//delete exercise 
router.delete('/:exerciseID', async (req, res) => {
    try {
        await Exercise.deleteOne({ _id: req.params.exerciseID })
        res.json('Exercise deleted');
    } catch (err) {
        res.json('Error: ' + err)

    }
})

//update exercise 
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;