const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const db = require("./data/dbConfig.js");
const Users = require("./userModel.js");
const Receipts = require("./receiptModel.js");

const server = express();
server.use(express.json());

server.post("/register", (req, res) => {
    let user = req.body;
    if (user.username && user.password) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        Users.add(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.status(400).json({
            err: "Please provide username and password."
        });
    }
});

server.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                req.session.user_id = user.id;
                req.session.loggedIn = true;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        });
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

router.post("/api/receipt", authenticate, async (req, res) => {
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

router.get("/api/logedinuser", authenticate, async (req, res) => {
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
            message: "The user information could not be retrieved"
        });
    }
});

router.get("/api/receipts", authenticate, async (req, res) => {
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

server.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        res.status(200).json({ message: "Hope to see you soon again" });
    });
});

router.put("/api/receipt/:id ", authenticate, async (req, res) => {
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

router.delete("/api/receipt/:id", authenticate, async (req, res) => {
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

module.exports = server;
