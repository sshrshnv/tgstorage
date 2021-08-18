export const moveCursorToEnd = (el) => {
  if (!el) return

  setTimeout(() => {
    if (typeof el.selectionStart == 'number') {
      el.focus()
      el.selectionStart = el.selectionEnd = el.value.length
    } else if (typeof el.createTextRange !== 'undefined') {
      el.focus()
      const range = el.createTextRange()
      range.collapse(false)
      range.select()
    }
  }, 0)
}
