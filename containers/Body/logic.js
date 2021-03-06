import fetch from 'isomorphic-fetch'
import { makeDebugger } from '../../utils/debug'

const debug = makeDebugger('L:Body')

let store = null

export function changeTheme(name) {
  debug('changeTheme', name)
  store.changeTheme(name)
}

export function changeLocale(lang) {
  // debug('changeLocale', lang)

  if (!store.isLocaleExist(lang)) {
    debug('process.env.NODE_ENV:', process.env.NODE_ENV)
    const localeUrl =
      process.env.NODE_ENV === 'development'
        ? `/locale/${lang}`
        : `/static/locales/${lang}.json`
    fetch(localeUrl)
      .then(res => res.json())
      .then(vals => {
        store.setLangMessages(lang, vals)
        store.changeLocale(lang)
      })
  } else {
    store.changeLocale(lang)
  }
}

export function init(selectStore) {
  store = selectStore
}
