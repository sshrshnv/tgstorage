import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

type Props = {
  class?: string
  style?: { fill: string }
  onClick?: () => void
}

const Fallback: FC = ({ children }) => (
  <Suspense fallback={<svg/>}>
    {children}
  </Suspense>
)

const ArrowSVG: FC = lazy(() => import('./arrow.svg'))
export const ArrowIcon: FC<Props> = () => <Fallback><ArrowSVG/></Fallback>

const BellSVG:FC = lazy(() => import('./bell.svg'))
export const BellIcon: FC<Props> = () => <Fallback><BellSVG/></Fallback>

const CrossSVG: FC = lazy(() => import('./cross.svg'))
export const CrossIcon: FC<Props> = () => <Fallback><CrossSVG/></Fallback>

const EditSVG: FC = lazy(() => import('./edit.svg'))
export const EditIcon: FC<Props> = () => <Fallback><EditSVG/></Fallback>

const EyeClosedSVG: FC = lazy(() => import('./eye-closed.svg'))
export const EyeClosedIcon: FC<Props> = () => <Fallback><EyeClosedSVG/></Fallback>

const EyeOpenedSVG: FC = lazy(() => import('./eye-opened.svg'))
export const EyeOpenedIcon: FC<Props> = () => <Fallback><EyeOpenedSVG/></Fallback>

const FolderLogoSVG: FC = lazy(() => import('./folder-logo.svg'))
export const FolderLogoIcon: FC<Props> = () => <Fallback><FolderLogoSVG/></Fallback>

const FolderPlusSVG: FC = lazy(() => import('./folder-plus.svg'))
export const FolderPlusIcon: FC<Props> = () => <Fallback><FolderPlusSVG/></Fallback>

const FolderSVG: FC = lazy(() => import('./folder.svg'))
export const FolderIcon: FC<Props> = (props) => <Fallback><FolderSVG {...props}/></Fallback>

const MenuSVG: FC = lazy(() => import('./menu.svg'))
export const MenuIcon: FC<Props> = () => <Fallback><MenuSVG/></Fallback>

const SettingsSVG: FC = lazy(() => import('./settings.svg'))
export const SettingsIcon: FC<Props> = () => <Fallback><SettingsSVG/></Fallback>

const SendSVG: FC = lazy(() => import('./send.svg'))
export const SendIcon: FC<Props> = () => <Fallback><SendSVG/></Fallback>

const AttachSVG: FC = lazy(() => import('./attach.svg'))
export const AttachIcon: FC<Props> = () => <Fallback><AttachSVG/></Fallback>

const CheckboxSVG: FC = lazy(() => import('./checkbox.svg'))
export const CheckboxIcon: FC<Props> = () => <Fallback><CheckboxSVG/></Fallback>

const CheckboxEmptySVG: FC = lazy(() => import('./checkbox-empty.svg'))
export const CheckboxEmptyIcon: FC<Props> = () => <Fallback><CheckboxEmptySVG/></Fallback>

const CheckboxFillSVG: FC = lazy(() => import('./checkbox-fill.svg'))
export const CheckboxFillIcon: FC<Props> = () => <Fallback><CheckboxFillSVG/></Fallback>

const PlusSVG: FC = lazy(() => import('./plus.svg'))
export const PlusIcon: FC<Props> = () => <Fallback><PlusSVG/></Fallback>

const UserSVG: FC = lazy(() => import('./user.svg'))
export const UserIcon: FC<Props> = () => <Fallback><UserSVG/></Fallback>

const BackSVG: FC = lazy(() => import('./back.svg'))
export const BackIcon: FC<Props> = () => <Fallback><BackSVG/></Fallback>

const SearchSVG: FC = lazy(() => import('./search.svg'))
export const SearchIcon: FC<Props> = () => <Fallback><SearchSVG/></Fallback>

const DeleteSVG: FC = lazy(() => import('./delete.svg'))
export const DeleteIcon: FC<Props> = () => <Fallback><DeleteSVG/></Fallback>

const CopySVG: FC = lazy(() => import('./copy.svg'))
export const CopyIcon: FC<Props> = () => <Fallback><CopySVG/></Fallback>

const MoveSVG: FC = lazy(() => import('./move.svg'))
export const MoveIcon: FC<Props> = () => <Fallback><MoveSVG/></Fallback>

const ShareSVG: FC = lazy(() => import('./share.svg'))
export const ShareIcon: FC<Props> = () => <Fallback><ShareSVG/></Fallback>

const CheckSVG: FC = lazy(() => import('./check.svg'))
export const CheckIcon: FC<Props> = () => <Fallback><CheckSVG/></Fallback>

const DragSVG: FC = lazy(() => import('./drag.svg'))
export const DragIcon: FC<Props> = () => <Fallback><DragSVG/></Fallback>

const FileSVG: FC = lazy(() => import('./file.svg'))
export const FileIcon: FC<Props> = () => <Fallback><FileSVG/></Fallback>

const DownloadSVG: FC = lazy(() => import('./download.svg'))
export const DownloadIcon: FC<Props> = () => <Fallback><DownloadSVG/></Fallback>

const DeviceSVG: FC = lazy(() => import('./device.svg'))
export const DeviceIcon: FC<Props> = () => <Fallback><DeviceSVG/></Fallback>

const PlaySVG: FC = lazy(() => import('./play.svg'))
export const PlayIcon: FC<Props> = () => <Fallback><PlaySVG/></Fallback>

const PauseSVG: FC = lazy(() => import('./pause.svg'))
export const PauseIcon: FC<Props> = () => <Fallback><PauseSVG/></Fallback>

const FullscreenSVG: FC = lazy(() => import('./fullscreen.svg'))
export const FullscreenIcon: FC<Props> = () => <Fallback><FullscreenSVG/></Fallback>

const FullscreenExitSVG: FC = lazy(() => import('./fullscreen-exit.svg'))
export const FullscreenExitIcon: FC<Props> = () => <Fallback><FullscreenExitSVG/></Fallback>

const LinkSVG: FC = lazy(() => import('./link.svg'))
export const LinkIcon: FC<Props> = () => <Fallback><LinkSVG/></Fallback>
