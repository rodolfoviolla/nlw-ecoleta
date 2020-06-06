// Importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()

// Criar o objeto de banco de dados
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Utilizar o objeto de banco de dados
db.serialize(() => {
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