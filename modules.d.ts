declare module '*.styl' {
  const value: { [key: string]: string }
  export = value
}
declare module '*.jpg' {
  const value: string
  export = value
}
declare module '*.png' {
  const value: string
  export = value
}
declare module '*.svg' {
  import type { FunctionComponent as FC } from 'preact'
  const value: FC<any>
  export = value
}
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor()
    [property: string]: any
  }
  export default WebpackWorker
}
