const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/id", (req, res) => {
  res.end()
});

function validateHobbit(req, res, next) {
  if (!req.body.name || !req.body.name.trim()) {
    res.status(422).end()
  } else {
    next()
  }
}

server.post("/hobbits", validateHobbit, async (req, res) => {
  res.status(201).json(await Hobbits.insert(req.body))
});

server.delete("/hobbits/:id", (req, res) => {
  res.end()
});

server.put("/hobbits/:id", (req, res) => {
  res.end()
});

module.exports = server;
