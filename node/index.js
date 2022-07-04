const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'node',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let msg = '';
connection.query('select * from people', function(err, rows, fields) {
    if (err) throw err;
    let count = 1;
    Object.keys(rows).forEach(function(key) {
        var row = rows[key];
        msg += row.name
        if (count < rows.length) {
            msg += ', '
        }
        count++;
      });
  });
connection.end

app.get('/', (req, res) => {
    res.send("<h1>Full Cycle Rocks!</h1>" +
            "<br/>Pessoas cadastradas: " + msg)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})