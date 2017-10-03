/*
 * a theme inspired by rethinkdb: https://rethinkdb.com/
*/

import { lighten, darken } from 'polished'

const fontColor = '#69a7ad'
const mainBg = '#E4EEED'

const Cyan = {
  font: fontColor,
  link: 'orange',
  main: '#7DC0C5',
  body_bg: mainBg,
  selection_bg: 'tomato',
  sidebar: {
    bg: '#1C4752',
    pin_active: fontColor,
    menu_link: '#D9E6E5',
    border_color: '#14363E',
  },
  u_panel: {
    link: lighten(0.3, fontColor),
    search_input: lighten(0.3, fontColor),
    search_icon: lighten(0.3, fontColor),
    bar_bg: darken(0.03, fontColor),
    border: darken(0.05, fontColor),
    text: lighten(0.2, fontColor),
    active_bg: darken(0.1, fontColor),
  },
}

export default Cyan
