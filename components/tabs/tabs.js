const tabsContainer = document.getElementById('tabs-container')
const tabsDiv = document.getElementById('tabs')
const webviewContainer = document.getElementById('webview-container')
const addTabBtn = document.getElementById('add-tab')

let tabCount = 0

function adjustWebviewSize () {
  const h = window.innerHeight - tabsContainer.offsetHeight
  document.querySelectorAll('webview').forEach(wv => (wv.style.height = `${h}px`))
}

window.addEventListener('resize', adjustWebviewSize)

function createTab (url = 'https://www.google.com') {
  const id = `tab-${++tabCount}`

  const tab = document.createElement('div')
  tab.classList.add('tab')
  tab.dataset.id = id
  tab.innerHTML = `Tab ${tabCount} <span class="close">×</span>`
  tabsDiv.appendChild(tab)

  const wv = document.createElement('webview')
  wv.setAttribute('src', url)
  wv.setAttribute('id', id)
  wv.setAttribute('allowpopups', '')
  wv.style.width = '100%'
  wv.style.display = 'none'
  webviewContainer.appendChild(wv)

  tab.addEventListener('click', () => activateTab(id))
  tab.querySelector('.close').addEventListener('click', e => {
    e.stopPropagation()
    closeTab(id)
  })

  adjustWebviewSize()
  activateTab(id)
}

function activateTab (id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
  document.querySelectorAll('webview').forEach(wv => (wv.style.display = 'none'))

  const tab = document.querySelector(`.tab[data-id="${id}"]`)
  const wv = document.getElementById(id)
  if (tab && wv) {
    tab.classList.add('active')
    wv.style.display = 'block'
  }
}

function closeTab (id) {
  const tab = document.querySelector(`.tab[data-id="${id}"]`)
  const wv = document.getElementById(id)
  if (tab) tab.remove()
  if (wv) wv.remove()

  const first = document.querySelector('.tab')
  if (first) activateTab(first.dataset.id)
  adjustWebviewSize()
}

addTabBtn.addEventListener('click', () => createTab())
createTab()
