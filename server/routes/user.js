const express = require("express");
const app = express.Router();
const User = require("../models/User");

app.post("/create", (req, res) => {
  const { username, password } = req.query;
  User.findOne({ where: { username: username } }).then((user) => {
    if (!user) {
      User.create({ username, password })
        .then((user) => res.send(user))
        .catch((err) => res.send(err));
    } else res.send("nombre de usuario en uso");
  });
});
app.post("/addFav/:id", (req, res) => {
  const id = req.params.id;
  const { username } = req.query;
  User.findOne({ where: { username } })
    .then((user) => {
      user && !user.favs.map(String).includes(String(id))
        ? user.update({ favs: [...user.favs, id] })
        : res.send("esta pelicula ya esta en tus favoritos");
      res.send(user);
    })
    .catch((err) => console.error(err));
});
app.delete("/removeFav/:id", (req, res) => {
  const id = req.params.id;
  const { username } = req.query;
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const favs = user.favs.filter((favId) => String(favId) !== id);

      if (favs.length === user.favs.length) {
        return res.send("Esta película no está en tus favoritos");
      }

      user.update({ favs }).then(() => {
        res.send(user);
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send("Ha ocurrido un error al eliminar la película de tus favoritos");
    });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  User.findOne({ where: { username: username } }).then((user) => {
    if (!user) {
      return res.send("Nombre de usuario incorrecto");
    }
    user.validatePassword(password).then((valid) => {
      if (valid) {
        return res.send(user);
      }
      res.send("contraseña invalida");
    });
  });
});

module.exports = app;
