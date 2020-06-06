const buttonSearch = document.querySelector('#page-home main a')
const close = document.querySelector('#modal .header a')
const modal = document.querySelector('#modal')

// Adicionar dinamicamente o evento onclick do botão no html
buttonSearch.addEventListener('click', () => {
  modal.classList.remove('hide')
})

// Adicionar dinamicamente o evento onclick do a no html
close.addEventListener('click', () => {
  modal.classList.add('hide')
})