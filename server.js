const express = require('express');
const app = express();
app.use(express.static('build'));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const db = mongoose.connect('mongodb://0.0.0.0/outer-wilds-api');

const astral_Body = require('./models/astral-bodies');
const character = require('./models/characters');
const log = require('./models/notes-log');

app.post('/astral-body', (req, res) => {
    const astralBody = new astral_Body();
    astralBody.name = req.body.name;
    astralBody.type = req.body.type;
    astralBody.gravity = req.body.gravity;
    astralBody.save((err, newAstralBody) => {
        if (err) {
            res.status(500).send({error: "Could not add astral body"});
        } else {
            res.send(newAstralBody);
        }
    });
});

app.get('/astral-body', (req,res) => {
    astral_Body.find({}, (err, astrals) => {
        if (err) {
            res.status(500).send({error: "Could not fetch astral bodies"});
        } else {
            res.send(astrals);
        }
    });
});

app.put('/astral-body', (req, res) => {
    astral_Body.findOne({name: req.body.name}, (err, astral_vd) => {
        if (err) {
            res.status(500).send({error: "Could not find astral body"});
        } else {
            astral_Body.updateOne({name: req.body.name}, {$set: {visited: true}}, (err, astral_ud) => {
                if (err) {
                    res.status(500).send({error: "Could not update astral body"});
                } else {
                    res.send(astral_ud);
                }
            });
        }
    });
});

app.post('/character', (req, res) => {
    const char = new character();
    char.name = req.body.name;
    char.instrument = req.body.instrument;
    astral_Body.findOne({name: req.body.habitat}, (err, char_habitate) => {
        if (err) {
            res.status(500).send({error: "Could not find character's habitat"});
        } else {
            char.habitat = char_habitate;
            char.save((err, newCharacter) => {
                if (err) {
                    res.status(500).send("Could not add character");
                } else {
                    res.send(newCharacter);
                }
            });
        }
    });
});

app.get('/character', (req,res) => {
    character.find({}, (err, chars) => {
        if (err) {
            res.status(500).send({error: "Could not fetch charachter"});
        } else {
            res.send(chars);
        }
    });
});

app.post('/log', (req, res) => {
    const noteLog = new log();
    noteLog.note = req.body.note;
    astral_Body.findOne({name: req.body.astral_body}, (err, note_body) => {
        if (err) {
            res.status(500).send({error: "Could not find astral body"});
        } else {
            noteLog.astral_body = note_body;
            noteLog.save((err, newLog) => {
                if (err) {
                    res.status(500).send("Could not add log");
                } else {
                    res.send(newLog);
                }
            });
        }
    });
});

app.get('/log', (req,res) => {
    log.find({}, (err, logs) => {
        if (err) {
            res.status(500).send({error: "Could not fetch log notes"});
        } else {
            res.send(logs);
        }
    });
});

app.listen(3004, () => {
    console.log("server running on port 3004");
});