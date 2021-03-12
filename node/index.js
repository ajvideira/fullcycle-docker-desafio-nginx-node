const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

const app = express();

app.get('/', async (req, res) => {
  await insertPeople();

  const people = await queryPeople();

  res.send(createHTML(people));
});

function insertPeople() {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO people(name) VALUES('Pessoa ${new Date().getTime()}')`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function queryPeople() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT id, name FROM people', (err, data) => {
      const people = [];
      data.forEach((person) => {
        people.push({ id: person.id, name: person.name });
      });
      resolve(people);
    });
  });
}

function createHTML(people) {
  let html = '<h1>Full Cycle Rocks!</h1>\n';
  html += '<table border="1">\n';
  html += '<thead>\n';
  html += '<tr><th colspan="2">Registered people</th></tr>\n';
  html += '<tr><th>ID</th><th>Name</th></tr>\n';
  html += '</thead>\n';
  html += '<tbody>\n';

  if (people.length > 0) {
    people.forEach((person) => {
      html += `<tr><td>${person.id}</td><td>${person.name}</td></tr>\n`;
    });
  } else {
    html += '<tr><td colspan="2">No people found</td></tr>\n';
  }

  html += '</tbody>\n';
  html += '</table>\n';

  return html;
}

app.listen(3000, () => {
  console.log('Server is listen on port 3000');
});
