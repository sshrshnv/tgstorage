type NavigatorExtended = Navigator & {
  standalone: boolean
}

const navigator = self.navigator as NavigatorExtended

let isStandalone
export const checkIsStandalone = () =>
  isStandalone ??= navigator.standalone || matchMedia('(display-mode: standalone)').matches
