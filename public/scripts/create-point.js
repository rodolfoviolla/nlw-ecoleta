// Elementos DOM utilizados na pesquisa de endereço
const inputCep = document.querySelector('input[name=cep]')
const inputAdress = document.querySelector('input[name=adress]')
const inputAdress2 = document.querySelector('input[name=adress2]')
const selectUf = document.querySelector('select[name=uf]')
const inputUf = document.querySelector('input[name=state]')
const selectCity = document.querySelector('select[name=city]')

// Elementos DOM utilizados na seleção de ítens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')
const colectedItems = document.querySelector('input[name=items]')
// Vetor que guarda os ítens de coleta selecionados
let selectedItems = []

// Adicionar dinamicamente o evento onchange do select no html
selectUf.addEventListener('change', () => getCities())

// Adicionar dinamicamente o evento onclick dos ítens no html
for (let item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

// Adicionar dinamicamente o evento onblur do input no html
inputCep.addEventListener('blur', searchCep)

populateUFs()

function clearAdress() {
  inputCep.value = ''
  inputAdress.value = ''
  inputAdress2.value = ''
  selectUf.value = ''
  inputUf.value = ''
  selectCity.value = ''
}

function toggleFields(disabled) {
  inputCep.disabled = disabled
  inputAdress.disabled = disabled
  inputAdress2.disabled = disabled
  selectUf.disabled = disabled
  inputUf.disabled = disabled
  selectCity.disabled = disabled
}

function populateUFs() {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

  // Comando fetch para receber a lista de estados do IBGE e colocar no select
  fetch(url)
  .then(res => res.json())
  .then(ufs => {
    for(let uf of ufs) {
      selectUf.innerHTML += `<option value="${uf.sigla}">${uf.nome}</option>`
    }
  })
}

// Modifiquei a maneira de captar o valor do estado, pra poder reutilizar a função em outro lugar do código
// function getCities(event) {
//   const citySelect = document.querySelector('select[name=city]')
//   const ufInput = document.querySelector('input[name=state]')
//   const ufValue = event.target.value
//   const indexOfSelectedUf = event.target.selectedIndex
//   const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`
  
//   ufInput.value = event.target.options[indexOfSelectedUf].text
//   citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
//   citySelect.disabled = true
  
//   // Comando fetch para receber a lista de cidades por estado do IBGE e colocar no select
//   fetch(url)
//   .then(res => res.json())
//   .then(cities => {
//     for(let city of cities) {
//       citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
//     }
//     citySelect.disabled = false
//   })
// }

function getCities(callback = () => {}) {
  const ufValue = selectUf.value
  const indexOfSelectedUf = selectUf.selectedIndex
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`
  
  inputUf.value = selectUf.options[indexOfSelectedUf].text
  selectCity.innerHTML = `<option value="">Selecione a Cidade</option>`
  selectCity.disabled = true
  
  // Comando fetch para receber a lista de cidades por estado do IBGE e colocar no select
  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for(let city of cities) {
      selectCity.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    selectCity.disabled = false
    return callback()
  })
}

function handleSelectedItem(event) {
  // Marcar ou desmarcar um ítem e adicionar ou remover do array de itens
  const itemLi = event.target
  const itemId = itemLi.dataset.id
  const alreadySelected = selectedItems.indexOf(itemId)

  if (alreadySelected >= 0) {
    selectedItems.splice(alreadySelected, 1)
  } else {
    selectedItems.push(itemId)
  }

  // Adicionar ou remover uma classe no HTML
  itemLi.classList.toggle('selected')
  colectedItems.value = selectedItems
}

// Função para buscar o endereço através do CEP e preencher os campos do formulário
function searchCep() {
  // Testando se CEP está vazio
  if (inputCep.value !== '') {
    // Cria constante com o formato correto do CEP utilizando Expressão Regular
    const validaCep = /^[0-9]{8}$/

    // Compara se o CEP digitado está no formato correto
    if (!validaCep.test(inputCep.value)) {
      alert('Digite o CEP corretamente')
      clearAdress()
      inputCep.focus()
    } else {
      // Cria constante com valor do CEP apenas com números utilizando Expressão Regular
      const cep = inputCep.value.replace(/\D/g, '')
      const url = `https://viacep.com.br/ws/${cep}/json`

      inputCep.value = 'Buscando...'
      toggleFields(true)
      // Comando fetch para receber a lista de cidades por estado do IBGE e colocar no select
      fetch(url)
      .then(res => res.json())
      .then(data => {
        // Se o CEP não existe, retorna um objeto com a propriedade erro = true
        if (data.erro) {
          alert('CEP não encontrado')
          clearAdress()
          toggleFields(false)
          inputCep.focus()
        } else {
          // getCities foi alterada para receber callback como parametro e 
          // preencher a cidade somente após ter buscado as cidades pela UF
          selectUf.value = data.uf
          getCities(() => {
            inputAdress.value = data.logradouro
            inputCep.value = data.cep
            selectCity.value = data.localidade
            toggleFields(false)
            inputAdress2.focus()
          })
        }
      })
    }
  }
}