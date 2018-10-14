const express = require('express');
const burger = require('../models/burger');

var router = express.Router();

router.get("/", (req, res) => {
    burger.all((result) => {
        let hbsObject = {
            burgers: result
        };

        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, 0],
        (result) => {
            res.json({ id: result.insertId });
        }
    );
});

router.put("/api/devour/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    burger.update(
        { devoured: true },
        condition,
        (result) => {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    )
});

module.exports = router;