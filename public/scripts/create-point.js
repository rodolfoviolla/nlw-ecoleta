function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

  fetch(url)
  .then(res => res.json())
  .then(ufs => {
    for(let uf of ufs) {
      ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const ufInput = document.querySelector('input[name=state]')
  const ufValue = event.target.value
  const indexOfSelectedUf = event.target.selectedIndex
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`
  
  ufInput.value = event.target.options[indexOfSelectedUf].text
  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
  citySelect.disabled = true
  
  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for(let city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id
  //forma da rocketseat
  //const alreadySelected = selectedItems.findIndex(item => item == itemId)
  // if (alreadySelected >= 0) {
  //   const filteredItems = selectedItems.filter(item => item != itemId)
  //   selectedItems = filteredItems
  // } else {
  //   selectedItems.push(itemId)
  // }
  
  //minha forma
  const alreadySelected = selectedItems.indexOf(itemId)
  if (alreadySelected >= 0) {
    selectedItems.splice(alreadySelected, 1)
  } else {
    selectedItems.push(itemId)
  }

  //Adicionar ou remover uma classe
  itemLi.classList.toggle('selected')
  colectedItems.value = selectedItems
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)

const itemsToCollect = document.querySelectorAll('.items-grid li')
const colectedItems = document.querySelector('input[name=items]')
let selectedItems = []

for (item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}