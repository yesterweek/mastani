import R from 'ramda'

import { makeDebugger } from '../../utils/debug'
import { SearchService } from './Pigeon'

const debug = makeDebugger('L:UniversePanel')

let store = null
let Pigeon = null

const RLog = x => debug('R log: ', x)

const washItems = R.compose(
  R.map(
    R.pick([
      'id',
      'name',
      'description',
      'language',
      'owner',
      'stargazers_count',
    ])
  ),
  R.prop('items')
)

// TODO: network error or something
const repoData = R.ifElse(R.has('items'), washItems, R.tap(RLog))

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
  store.markState({
    inputValue,
    searching: true,
  })
  Pigeon.search(inputValue)
}

export function init(selectedStore) {
  store = selectedStore
  debug('store', store)
  Pigeon = new SearchService()

  Pigeon.get().subscribe(res => {
    debug('Pigeon get: ', res)
    // debug('washed: ', repoData(res.items))
    store.markState({
      searching: false,
    })
    store.replaceRepos(repoData(res))
    // store.replaceRepos([])
  })

  Pigeon.emptyInput().subscribe(() => {
    debug('Pigeon get emptyInput!')
    store.markState({
      searching: false,
    })
    store.clearRepos()
  })
}
