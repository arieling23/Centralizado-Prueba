const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tareas', (req, res) => {
  db.all('SELECT * FROM tareas', [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/tareas', (req, res) => {
  const { descripcion } = req.body;
  db.run('INSERT INTO tareas(descripcion) VALUES (?)', [descripcion], err => {
    res.sendStatus(201);
  });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
