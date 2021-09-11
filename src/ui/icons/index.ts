const importIcon = async (icon: string) => import(
  /* webpackMode: 'eager' */
  `./${icon}.svg`
)

export default importIcon
