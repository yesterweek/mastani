/*
 * SidebarStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'
import { makeDebugger } from '../../utils/debug'
import { isObject } from '../../utils'
import MenuItem from './MenuItemStore'
import fakeMenuItems from './fake_menu_items'

const debug = makeDebugger('S:SidebarStore')

// TODO: test/include sidebarStore and MenuItem
const SidebarStore = t
  .model('SidebarStore', {
    menuItems: t.optional(t.array(MenuItem), []), // complex data
    open: t.optional(t.boolean, false),
    pin: t.optional(t.boolean, false),
    // theme: t.string, // view staff
    // curSelectItem: t.string, // view staff
    // searchBox: t.string, // complex data
    loading: t.optional(t.boolean, false),
    one: t.optional(t.number, 1),
  })
  .views(self => ({
    get app() {
      return getParent(self)
    },
    get theme() {
      return self.app.theme
    },
    get langs() {
      return self.app.langs
    },
    get menuItemsData() {
      return self.menuItems.toJSON()
    },
    get getLoading() {
      return self.loading
    },
    get langMessages() {
      return self.app.langMessages
    },
  }))
  .actions(self => ({
    loadMenuItem() {
      debug('loadMenuItem ...')
      self.menuItems = fakeMenuItems
    },

    markLoading() {
      debug('markLoading: ', self.loading)
      self.loading = !self.loading
    },

    markState(sobj) {
      if (!isObject(sobj)) {
        throw new Error('markState get no object params')
      }
      R.forEachObjIndexed((val, key) => {
        self[key] = val
      }, sobj)
    },

    addOne() {
      self.one += 1
    },
    changeTheme(name) {
      self.app.changeTheme(name)
    },
  }))

export default SidebarStore
