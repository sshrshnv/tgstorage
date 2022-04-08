import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import SafariSVG from './safari.svg'
import ShareSVG from './share.svg'
import ShareModernSVG from './share-modern.svg'
import HomeScreenSVG from './home-screen.svg'
import HomeScreenModernSVG from './home-screen-modern.svg'

type Props = {
  class?: string
  style?: { fill: string }
}

export const SafariIcon: FC<Props> = (props) => <SafariSVG {...props}/>
export const ShareIcon: FC<Props> = (props) => <ShareSVG {...props}/>
export const ShareModernIcon: FC<Props> = (props) => <ShareModernSVG {...props}/>
export const HomeScreenIcon: FC<Props> = (props) => <HomeScreenSVG {...props}/>
export const HomeScreenModernIcon: FC<Props> = (props) => <HomeScreenModernSVG {...props}/>
