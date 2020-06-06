const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const db = require('./database/db')

// Configurar pasta pública
server.use(express.static('public'))

// Habilitar o req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizar template engine
nunjucks.configure('src/views', { express: server, noCache: true })

// Configurar caminhos da aplicação
// Raiz
server.get('/', (req, res) => res.render('index.html'))

// Criar ponto de coleta
server.get('/create-point', (req, res) => res.render('create-point.html'))

// Inserir dados no banco de dados
server.post('/savepoint', (req, res) => {
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

  db.run(query, values, afterInsertData)

  function afterInsertData(err) {
    if (err) {
      // Adicionada rota caso dê erro na inserção dos dados
      return res.render('create-point.html', { error: true })
    }
    res.render('create-point.html', { saved: true })
  }
})

// Buscar pontos de coleta
server.get('/search-results', (req, res) => {
  const search = req.query.search

  // Se não houver registros
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