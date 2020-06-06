const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
// Pegar o banco de dados
const db = require('./database/db')

// Configurar pasta pública
server.use(express.static('public'))

// Habilitar o req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
nunjucks.configure('src/views', { express: server, noCache: true })

// Configurar caminhos da aplicação
server.get('/', (req, res) => res.render('index.html'))

server.get('/create-point', (req, res) => {
  // req.query: Query Strings da url
  // console.log(req.query)

  return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
  // Inserir dados no banco de dados
  const query = `
    INSERT INTO places (
      image,
      name,
      adress,
      adress2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send('Erro no cadastro!')
    }
    console.log('Cadastrado com sucesso')
    console.log(this)

    res.render('create-point.html', { saved: true })
  }

  db.run(query, values, afterInsertData)
})

server.get('/search-results', (req, res) => {
  const search = req.query.search

  if (search == '') {
    return res.render('search-results.html', { total: 0 })
  }

  // Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length
    // Mostrar a página html com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total })
  })
})

// Ligar o servidor
server.listen(3000)