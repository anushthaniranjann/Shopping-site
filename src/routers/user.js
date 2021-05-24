const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/authentication');

const router = new express.Router();

router.post('/users', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({ user: user, token });
    } catch (e) {
        res.status(400).send();
    }
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
})

router.patch('/users/me', auth, async(req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdateProperties = ['name', 'email', 'age', 'password'];
    const isValidProperty = updates.every((update) => allowedUpdateProperties.includes(update));

    if (!isValidProperty) {
        return res.status(400).send({ error: 'Inavlid Updates' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }

})


module.exports = router