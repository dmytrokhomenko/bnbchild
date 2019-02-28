const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')

router.get('', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
        res.json({ ok: true, foundRentals: foundRentals })
    });
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rental.findById(rentalId, (err, foundRental) => {
        if(err){
            res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
        }

        res.json({ok: true, foundRental: foundRental});
    });
});

module.exports = router;