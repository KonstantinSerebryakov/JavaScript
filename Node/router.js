const express = require('express');
const router = express.Router();

const positionModel = require('./positions');
const applicantsModel = require('./applicants');

const mailEmitter = require('./mailSender');

router.get('/positions', async (req, res, next) => {
    try {
        const category = req.query.category;
        const level = req.query.level;
        const tag = req.query.tag;

        const positions = await positionModel.getAllPositions();

        res.setHeader('content-type', 'application/json');
        res.statusCode = 200;

        if (!(category || level || tag)) {
            res.json(positions);
        } else {
            const filtered = positions.filter((position) => {
                return category && category === position.category ||
                    level && level === position.level ||
                    tag && tag === position.tag;
            })

            res.json(filtered);
        }
    } catch (e) {
        next(e);
    }
});

router.get('/positions/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const position = await positionModel.getPositionById(id);
        res.setHeader('content-type', 'application/json');
        res.statusCode = 200;
        res.json(position);
    } catch (e) {
        next(e);
    }
});

router.post('/positions', async (req, res, next) => {
    const positionToAdd = req.body;
    try {
        const id = await positionModel.addNewPosition(positionToAdd);

        mailEmitter.emit('add', id);

        res.statusCode = 201;
        res.set('location', id);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.patch('/positions/:id', async (req, res, next) => {
    const id = req.params.id;
    const positionToPatch = req.body;
    try {
        res.statusCode = await positionModel.updatePosition(id, positionToPatch);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.delete('/positions/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await positionModel.removePosition(id);

        mailEmitter.emit('remove', id);

        res.statusCode = 204;
        res.end();
    } catch (e) {
        next(e);
    }
});

router.post('/applicants', async (req, res, next) => {
    const applicantToAdd = req.body;
    try {
        const id = await applicantsModel.addApplicant(applicantToAdd);

        res.statusCode = 201;
        res.set('location', id);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.put('/applicants/:id', async (req, res, next) => {
    const id = req.params.id;
    const applicantToSet = req.body;
    try {
        res.statusCode = await applicantsModel.updateApplicant(id, applicantToSet);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.delete('/applicants/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await applicantsModel.removeApplicant(id);
        res.statusCode = 204;
        res.end();
    } catch (e) {
        next(e);
    }
});

router.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send("Unexpected server error: " + JSON.stringify(err))
})

module.exports = router;
