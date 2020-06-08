// Importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()

// Criar o objeto de banco de dados
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Utilizar o objeto de banco de dados
db.serialize(() => {
  // Inserir campo na tabela
  //db.run(`ALTER TABLE places ADD cep TEXT;`)
  
  // Criar uma tabela
  // db.run(`
  // CREATE TABLE IF NOT EXISTS places (
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   image TEXT,
  //   name TEXT,
  //   adress TEXT,
  //   adress2 TEXT,
  //   state TEXT,
  //   city TEXT,
  //   items TEXT
  // );
  // `)

  // Atualizar dados na tabela
  //db.run(`UPDATE places SET cep = '01001-010' WHERE id = 10;`)

  // Consultar dados na tabela
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log('Aqui estão seus registros')
  //   console.log(rows)
  // })

  // Deletar dados na tabela
  // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log('Registro deletado com sucesso')
  // })
})