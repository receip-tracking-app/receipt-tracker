const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const db = require("./data/dbConfig.js");
const Users = require("./userModel.js");
const Receipts = require("./receiptModel.js");
const router = express.Router();

router.post("/register", (req, res) => {
    if (
        req.body.username &&
        req.body.password &&
        req.body.firstname &&
        req.body.lastname
    ) {
        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "There was an error trying to add the user."
                });
            });
    } else {
        res.status(400).json({
            message: "Please enter a username and password."
        });
    }
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    req.session.username = user.userName;
                    req.session.user_id = user.id;
                    req.session.loggedIn = true;
                    req.session.save(err => {
                        if (!err) {
                            console.log(req.session.id);
                            res.status(200).json({
                                message: `Welcome ${user.userName} ${user.id}! `
                            });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    res.status(401).json({ message: "Invalid Credentials" });
                }
            });
    } else {
        res.status(400).json({ message: "No Credentials Provided" });
    }
});

function authenticate(req, res, next) {
    const { username, password } = req.headers;
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: "Invalid Credentials" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Server Error" });
            });
    } else {
        res.status(400).json({ message: "No Credentials Provided" });
    }
}

router.post("/receipt", authenticate, async (req, res) => {
    const receiptData = { ...req.body, user_id: req.session.user_id };

    try {
        const saved = await Hubs.insertReceipt(receiptData);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({
            message: "Failed to save receipt",
            err
        });
    }
});

router.get("/logedinuser", async (req, res) => {
    console.log(req.session.id);
    try {
        const user = await Users.findById(req.session.user_id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The user information could not be retrieved",
            errormessage: error.message
        });
    }
    console.log("Mistake", req.session.user_id);
});

router.get("/receipts", authenticate, async (req, res) => {
    try {
        const receipts = await Users.get(req.session.user_id);

        if (array.length !== 0) {
            res.json(receipts);
        } else {
            res.status(404).json({
                err: "The user with the specified ID does not exist."
            });
        }
    } catch (err) {
        res.status(500).json({
            err: "The receipts information could not be retrieved."
        });
    }
});

//router.get("/", async (req, res) => {
//try {
// const tasks = await Tasks.get(req.query);
//res.status(200).json(tasks);
//} catch (err) {
//   console.log(err);
// res.status(500).json({
//  message: "The tasks information could not be retrieved."
//});
//}
//});

router.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        res.status(200).json({ message: "Hope to see you soon again" });
    });
});

router.put("/receipt/:id ", authenticate, async (req, res) => {
    const updatedReceipt = req.body;

    if (updatedPost.title && updatedPost.contents) {
        try {
            const receipt = await Receipt.update(req.params.id, req.body);
            res.status(200).json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "The receipt information could not be modified."
            });
        }
    } else {
        res.status(400).json({
            err: "Please provide title and contents for the receipt."
        });
    }
});

router.delete("/receipt/:id", authenticate, async (req, res) => {
    try {
        const receipt = await Receipt.remove(req.params.id);

        if (receipt) {
            res.status(200).json(receipt);
        } else {
            res.status(404).json({
                message: "The receipt with the specified ID does not exist."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The receipt could not be removed."
        });
    }
});

module.exports = router;
