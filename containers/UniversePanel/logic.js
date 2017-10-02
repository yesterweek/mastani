import R from 'ramda'

import { makeDebugger } from '../../utils/debug'
// import { SearchService } from './Pigeon'
import Doraemon from './Doraemon'

const debug = makeDebugger('L:UniversePanel')

let store = null
let Doraemon$ = null

// const RLog = x => debug('R log: ', x)

// TODO: network error or something

const reposIsEmpty = R.compose(R.isEmpty, R.prop('reposData'))
const inputValueIsNotEmpty = R.compose(R.not, R.isEmpty, R.prop('inputValue'))
const isNotSearching = R.compose(R.not, R.prop('searching'))

export const repoNotFound = R.allPass([
  reposIsEmpty,
  inputValueIsNotEmpty,
  isNotSearching,
])

export function search(e) {
  const inputValue = e.target.value
  // store.markState('inputValue', value)

  Doraemon$.search(inputValue)
}

export function hidePanel() {
  debug('hidePanel')
}

export function onKeyPress(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    debug('completion ...')
  }
  // debug('onKeyPress ..', e.key)
}

export function panelClick(e) {
  debug('panelClick ...')
  e.stopPropagation()
}

export function init(selectedStore) {
  store = selectedStore
  debug('store', store)
  Doraemon$ = new Doraemon()

  Doraemon$.get().subscribe(res => {
    debug('Doraemon get: ', res)
    // debug('washed: ', repoData(res.items))
    // store.replaceRepos([])
  })

  Doraemon$.emptyInput().subscribe(() => {
    debug('Doraemon get emptyInput!')
    store.markState({
      searching: false,
    })
    store.clearRepos()
  })
}
