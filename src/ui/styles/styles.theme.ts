import vars from './styles.vars.json'

export const AVAILABLE_THEMES = ['system', 'dark', 'light'] as const
export type AvailableThemes = typeof AVAILABLE_THEMES[number]

export const COLORS = [
  vars['color-brand'],
  '#e57373','#69f0ae','#f06292','#ffa726','#4dd0e1','#ba68c8','#00e676',
  '#536dfe','#d4e157','#64ffda','#7c4dff','#00e5ff','#ff8a80','#1de9b6',
  '#81c784','#7986cb','#b2ff59','#ffd54f','#9575cd','#ffb74d','#ff7043',
  '#aed581','#c6ff00','#ffa726','#d500f9','#ffea00','#76ff03','#ff9100',
  '#aeea00','#b388ff','#cddc39','#ff80ab','#8bc34a','#ea80fc','#f4ff81',
  '#8c9eff','#ff8a80','#80d8ff','#7e57c2','#a7ffeb','#82b1ff','#84ffff',
  '#ccff90','#ffd180','#ff9e80','#18ffff','#ffe57f','#e040fb','#b9f6ca'
]

//pink: #ff4081
//red: #ff5252

export const getColor = (index: number | undefined) =>
  typeof index === 'number' ? COLORS[index % COLORS.length] : vars['color-brand']

export const getRandomColor = () =>
  COLORS[Math.floor(Math.random() * COLORS.length )]
