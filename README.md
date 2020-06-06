# nlw

Projeto realizado no evento Next Level Week da [Rocketseat](https://rocketseat.com.br/)

## Ecoleta
Aplicação de cadastro de pontos de coleta de materiais recicláveis e pesquisa de pontos de coleta por cidade

## Páginas da aplicação
### Home
Página inicial, que dá acesso à página de cadastro e à página de busca por cidade
### Cadastro de pontos de coleta
Página de cadastro de pontos de coleta, onde é possível inserir os seguintes dados:
- Nome da entidade
- Link para imagem de referência da entidade
- Endereço da entidade
- Estado, selecionado através da lista de estados do IBGE
- Cidade, selecionado através da lista de cidades do IBGE, filtrada pelo estado escolhido
- Ítens coletados pela entidade, sendo possível escolher quantos forém necessários na lista fornecida
Todos os campos são obrigatórios, exceto o de ítens coletados
### Busca de pontos de coleta por cidade
A busca recebe o nome da cidade digitada pelo usuário e retorna todos os registros onde o nome da cidade contenha o texto que foi digitado
