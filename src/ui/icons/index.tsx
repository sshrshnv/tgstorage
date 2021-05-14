import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import type { FunctionComponent as FC } from 'preact'

type Props = {
  class?: string
  style?: { fill: string }
  onClick?: () => void
}

const ArrowSVG: FC = lazy(() => import('./arrow.svg'))
export const ArrowIcon: FC<Props> = () => <Suspense fallback={null}><ArrowSVG/></Suspense>

const BellSVG:FC = lazy(() => import('./bell.svg'))
export const BellIcon: FC<Props> = () => <Suspense fallback={null}><BellSVG/></Suspense>

const CloseSVG: FC = lazy(() => import('./close.svg'))
export const CloseIcon: FC<Props> = () => <Suspense fallback={null}><CloseSVG/></Suspense>

const EditSVG: FC = lazy(() => import('./edit.svg'))
export const EditIcon: FC<Props> = () => <Suspense fallback={null}><EditSVG/></Suspense>

const EyeClosedSVG: FC = lazy(() => import('./eye-closed.svg'))
export const EyeClosedIcon: FC<Props> = () => <Suspense fallback={null}><EyeClosedSVG/></Suspense>

const EyeOpenedSVG: FC = lazy(() => import('./eye-opened.svg'))
export const EyeOpenedIcon: FC<Props> = () => <Suspense fallback={null}><EyeOpenedSVG/></Suspense>

const FolderLogoSVG: FC = lazy(() => import('./folder-logo.svg'))
export const FolderLogoIcon: FC<Props> = () => <Suspense fallback={null}><FolderLogoSVG/></Suspense>

const FolderPlusSVG: FC = lazy(() => import('./folder-plus.svg'))
export const FolderPlusIcon: FC<Props> = () => <Suspense fallback={null}><FolderPlusSVG/></Suspense>

const FolderSVG: FC = lazy(() => import('./folder.svg'))
export const FolderIcon: FC<Props> = (props) => <Suspense fallback={null}><FolderSVG {...props}/></Suspense>

const MenuSVG: FC = lazy(() => import('./menu.svg'))
export const MenuIcon: FC<Props> = () => <Suspense fallback={null}><MenuSVG/></Suspense>

const SettingsSVG: FC = lazy(() => import('./settings.svg'))
export const SettingsIcon: FC<Props> = () => <Suspense fallback={null}><SettingsSVG/></Suspense>

const SendSVG: FC = lazy(() => import('./send.svg'))
export const SendIcon: FC<Props> = () => <Suspense fallback={null}><SendSVG/></Suspense>

const AttachSVG: FC = lazy(() => import('./attach.svg'))
export const AttachIcon: FC<Props> = () => <Suspense fallback={null}><AttachSVG/></Suspense>

const CheckboxSVG: FC = lazy(() => import('./checkbox.svg'))
export const CheckboxIcon: FC<Props> = () => <Suspense fallback={null}><CheckboxSVG/></Suspense>

const CheckboxFillSVG: FC = lazy(() => import('./checkbox-fill.svg'))
export const CheckboxFillIcon: FC<Props> = () => <Suspense fallback={null}><CheckboxFillSVG/></Suspense>

const PlusSVG: FC = lazy(() => import('./plus.svg'))
export const PlusIcon: FC<Props> = () => <Suspense fallback={null}><PlusSVG/></Suspense>

const UserSVG: FC = lazy(() => import('./user.svg'))
export const UserIcon: FC<Props> = () => <Suspense fallback={null}><UserSVG/></Suspense>

const BackSVG: FC = lazy(() => import('./back.svg'))
export const BackIcon: FC<Props> = () => <Suspense fallback={null}><BackSVG/></Suspense>

const SearchSVG: FC = lazy(() => import('./search.svg'))
export const SearchIcon: FC<Props> = () => <Suspense fallback={null}><SearchSVG/></Suspense>

const DeleteSVG: FC = lazy(() => import('./delete.svg'))
export const DeleteIcon: FC<Props> = () => <Suspense fallback={null}><DeleteSVG/></Suspense>
