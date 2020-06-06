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

## Branches
### master
Projeto com as mesmas funcionalidades propostas durante o evento Next Level Week
### busca_por_cep
- Cadastro de ontos de coleta
 - Implementada funcionalidade de busca de endereço por CEP
 - Implementada tela de erro quando há problema na inserção de dados no banco de dados
 - Alterações visuais para abarcar o novo campo criado
- Busca de pontos de coleta
 - Ao encontrar apenas um registro, alterado o texto para uso do singular
