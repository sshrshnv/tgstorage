export const ungzip = (buffer: ArrayBuffer, cb) => {
  const process = () => {
    const ds: TransformStream<ArrayBuffer, ArrayBuffer> = new self.DecompressionStream('gzip')
    const dsWriter = ds.writable.getWriter()
    dsWriter.write(buffer)
    dsWriter.close()
    new Response(ds.readable).arrayBuffer().then(res => cb(res))
  }
  process()
}
