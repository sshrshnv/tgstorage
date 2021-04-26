import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import type { FunctionComponent as FC } from 'preact'

const ArrowSVG: FC = lazy(() => import('./arrow.svg'))
export const ArrowIcon: FC = () => <Suspense fallback={<div/>}><ArrowSVG/></Suspense>

const BellSVG:FC = lazy(() => import('./bell.svg'))
export const BellIcon: FC = () => <Suspense fallback={<div/>}><BellSVG/></Suspense>

const CloseSVG: FC = lazy(() => import('./close.svg'))
export const CloseIcon: FC = () => <Suspense fallback={<div/>}><CloseSVG/></Suspense>

const EditSVG: FC = lazy(() => import('./edit.svg'))
export const EditIcon: FC = () => <Suspense fallback={<div/>}><EditSVG/></Suspense>

const EyeClosedSVG: FC = lazy(() => import('./eye-closed.svg'))
export const EyeClosedIcon: FC = () => <Suspense fallback={<div/>}><EyeClosedSVG/></Suspense>

const EyeOpenedSVG: FC = lazy(() => import('./eye-opened.svg'))
export const EyeOpenedIcon: FC = () => <Suspense fallback={<div/>}><EyeOpenedSVG/></Suspense>

const FolderLogoSVG: FC = lazy(() => import('./folder-logo.svg'))
export const FolderLogoIcon: FC = () => <Suspense fallback={<div/>}><FolderLogoSVG/></Suspense>

const FolderPlusSVG: FC = lazy(() => import('./folder-plus.svg'))
export const FolderPlusIcon: FC = () => <Suspense fallback={<div/>}><FolderPlusSVG/></Suspense>

const FolderSVG: FC = lazy(() => import('./folder.svg'))
export const FolderIcon: FC<{ style: { fill: string } }> = (props) => <Suspense fallback={<div/>}><FolderSVG {...props}/></Suspense>

const LoaderSVG: FC = lazy(() => import('./loader.svg'))
export const LoaderIcon: FC = () => <Suspense fallback={<div/>}><LoaderSVG/></Suspense>

const MenuSVG: FC = lazy(() => import('./menu.svg'))
export const MenuIcon: FC = () => <Suspense fallback={<div/>}><MenuSVG/></Suspense>

const SettingsSVG: FC = lazy(() => import('./settings.svg'))
export const SettingsIcon: FC = () => <Suspense fallback={<div/>}><SettingsSVG/></Suspense>

const SendSVG: FC = lazy(() => import('./send.svg'))
export const SendIcon: FC = () => <Suspense fallback={<div/>}><SendSVG/></Suspense>

const AttachSVG: FC = lazy(() => import('./attach.svg'))
export const AttachIcon: FC = () => <Suspense fallback={<div/>}><AttachSVG/></Suspense>

const CheckboxSVG: FC = lazy(() => import('./checkbox.svg'))
export const CheckboxIcon: FC = () => <Suspense fallback={<div/>}><CheckboxSVG/></Suspense>

const CheckboxFillSVG: FC = lazy(() => import('./checkbox-fill.svg'))
export const CheckboxFillIcon: FC = () => <Suspense fallback={<div/>}><CheckboxFillSVG/></Suspense>

const PlusSVG: FC = lazy(() => import('./plus.svg'))
export const PlusIcon: FC = () => <Suspense fallback={<div/>}><PlusSVG/></Suspense>

const UserSVG: FC = lazy(() => import('./user.svg'))
export const UserIcon: FC = () => <Suspense fallback={<div/>}><UserSVG/></Suspense>

const BackSVG: FC = lazy(() => import('./back.svg'))
export const BackIcon: FC = () => <Suspense fallback={<div/>}><BackSVG/></Suspense>
