const { Router } = require('express');
const Habit = require('../models/Habit');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router() 

    .post('/', ensureAuth, (req, res, next) => {
        const {
            habit,
            description,
        } = req.body;

        Habit
            .create({ habit, description, user: req.user.sub })
            .then(habit => {
                res.send(habit);
            })
            .catch(next);
    })

    .get('/', ensureAuth, (req, res, next) => {
        
        Habit
            .find({ user: req.user.sub })
            .then(habits => {
                res.send(habits);
            })
            .catch(next);
    }) 

    .get('/:id', (req, res, next) => {

        Habit
            .findById(req.params.id)
            .then(habit => {
                res.send(habit);
            })
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {

        const {
            description
        } = req.body;

        Habit
            .findByIdAndUpdate(req.params.id, { description }, { new: true })
            .then(patchedHabit => {
                res.send(patchedHabit);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {

        const {
            habit,
            description
        } = req.body;

        Habit
            .findByIdAndUpdate(req.params.id, { habit, description }, { new: true })
            .then(replacedHabit => {
                res.send(replacedHabit);
            })
            .catch(next);

    })

    .delete('/:id', (req, res, next) => {

        Habit
            .findByIdAndDelete(req.params.id)
            .then(deletedHabit => {
                res.send(deletedHabit);
            })
            .catch(next);
    });
