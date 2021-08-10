import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useRef } from 'preact/hooks'
import cn from 'classnames'

import type { MessageWebpage } from '~/core/store'
import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'
import { Text } from '~/ui/elements/text'
import { BluredImage } from '~/ui/elements/blured-image'
import { FilePreviewImage } from '~/ui/elements/file-preview-image'
import { LinkPreviewIcon } from '~/ui/elements/link-preview-icon'
import { Break } from '~/ui/elements/break'
import { Loader } from '~/ui/elements/loader'

import styles from './content-item-webpage.styl'

type Props = {
  webpage: MessageWebpage
  blurPreviewUrl?: string
  hasPreviewFile?: boolean
  previewFileKey?: string
  single?: boolean
  loading?: boolean
  menu?: MenuProps | null
}

export const ContentItemWebpage: FC<Props> = memo(({
  webpage,
  blurPreviewUrl,
  hasPreviewFile,
  previewFileKey,
  single,
  loading,
  menu
}) => {
  const elRef = useRef<HTMLDivElement>(null)

  return (
    <Fragment>
      <div
        class={cn(
          styles.root,
          single && styles._single
        )}
        ref={elRef}
      >
        <a
          class={cn(
            styles.preview,
            !webpage.url && styles._disabled
          )}
          href={webpage.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {blurPreviewUrl && (
            <BluredImage
              url={blurPreviewUrl}
              width={64}
              height={64}
              radius={8}
            />
          )}
          {hasPreviewFile && (
            <FilePreviewImage
              fileKey={previewFileKey}
              timeout={50}
              isLink
            />
          )}
          {!hasPreviewFile && (
            <LinkPreviewIcon/>
          )}
        </a>

        <div class={styles.description}>
          <Text class={styles.title} grey small ellipsis>
            {webpage.title || webpage.displayUrl}
          </Text>
          <div class={styles.footer}>
            <Text grey ellipsis capitalize={!webpage.siteName && !!webpage.type}>
              {webpage.siteName || webpage.type || webpage.url}
            </Text>
          </div>
        </div>

        {loading && (
          <Loader class={styles.loader} grey/>
        )}

        {(!loading && menu) && (
          <Menu
            {...menu}
            class={styles.menu}
            parentRef={elRef}
          />
        )}
      </div>

      {single && (
        <Break size={16} px/>
      )}
    </Fragment>
  )
})
